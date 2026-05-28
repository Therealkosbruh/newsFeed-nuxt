import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  typescript: {
    typeCheck: false,
  },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/eslint',
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: false,
        },
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        files: ['en/common.json', 'en/home.json', 'en/story.json', 'en/bookmarks.json'],
      },
      {
        code: 'ru',
        language: 'ru-RU',
        files: ['ru/common.json', 'ru/home.json', 'ru/story.json', 'ru/bookmarks.json'],
      },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
    },
  },
  imports: {
    dirs: ['src/entities/*/model', 'src/features/*/model', 'src/shared/composables'],
  },
  components: [
    { path: '~/src/shared/ui', pathPrefix: false },
    { path: '~/src/entities/story/ui', pathPrefix: false },
    { path: '~/src/entities/comment/ui', pathPrefix: false },
    { path: '~/src/features/filters/ui', pathPrefix: false },
    { path: '~/src/widgets', pathPrefix: false },
  ],
  css: ['~/src/app/styles/global.scss'],

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'ui-vendor': ['primevue'],
          },
        },
      },
    },
  },
})
