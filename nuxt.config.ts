// https://nuxt.com/docs/api/configuration/nuxt-config
const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-icon', '@pinia/nuxt', '@nuxt/ui', '@vite-pwa/nuxt'],
  // @ts-ignore - PWA module types are not properly recognized
  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Super-App Unidos',
      short_name: 'Super-App Unidos',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    // Keys within public, will be also exposed to the client-side
    public: {
      baseUrl: process.env.BASE_URL || 'localhost:3003',
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  // ssr: false,
});