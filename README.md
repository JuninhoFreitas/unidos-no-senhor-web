<center>
<a href="https://web.unidosnosenhor.com.br">
<img src="./assets/img/logo.png" width=80/>
</a>
</center>

# Web Unidos no Senhor - Front

Este é o projeto do front-end do Website da Unidos, ele é construído usando o framework Nuxt, Vue3, e Tailwind.

## Live Demo

**[https://web.unidosnosenhor.com.br/](https://web.unidosnosenhor.com.br/)**

## Documentação do Nuxt

[Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction)

## Pré-Requisitos

- [Node + Node Version Manager(Windows)](https://github.com/coreybutler/nvm-windows)
- [API de Backend da Unidos](https://github.com/JuninhoFreitas/unidos-no-senhor-api/)

## Instalação

Use um destes para instalar as as dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Configurando

### Varíaveis de Ambiente:

Clone o arquivo `.env.example` e renome-o para `.env`, e realize as alterações necessárias

### Iniciando o Servidor de Backend

É necessário o servidor de backend estar rodando para o site funcionar adequadamente, **caso não for possível executar ele, então inicie o servidor de mock na pasta /mock**

```bash
# Navegando para a pasta
cd mock

# Instalando dependências
npm i

# Executando o Servidor
npm run start
```

## Desenvolvendo

Inicie o servidor de desenvolvimento `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Servidor de Produção

Faça o build da aplicação usando um destes:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Observe o resultado de produção previamente:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
