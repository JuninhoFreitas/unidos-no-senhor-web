FROM node:20 AS base
 
FROM base AS deps
COPY .env .env
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
 
FROM base AS build
COPY .env .env
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
 
FROM base
COPY .env .env
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/.output/public /app/.output/public
ENV NODE_ENV production
RUN ls -la
CMD ["npx","serve", ".output/public"]

 