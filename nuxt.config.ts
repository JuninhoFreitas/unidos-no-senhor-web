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
      name: 'UnidosNoSenhor',
      short_name: 'UnidosNoSenhor',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'android-launchericon-512-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'android-launchericon-192-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'android-launchericon-144-144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'android-launchericon-96-96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'android-launchericon-72-72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'android-launchericon-48-48.png',
          sizes: '48x48',
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
  ssr: false,
});