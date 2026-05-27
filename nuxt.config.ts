import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark",
          cssLayer: false,
        },
      },
    },
  },
  colorMode: {
    classSuffix: "",
  },
  i18n: {
    locales: [
      {
        code: "en",
        language: "en-US",
        files: ["en/common.json", "en/home.json"],
      },
      {
        code: "ru",
        language: "ru-RU",
        files: ["ru/common.json", "ru/home.json"],
      },
    ],
    defaultLocale: "en",
    langDir: "locales",
    compilation: {
      strictMessage: false,
    },
  },
  imports: {
    dirs: [
      "src/entities/*/model",
      "src/features/*/model",
      "src/shared/composables",
    ],
  },
  components: [
    { path: "~/src/shared/ui", pathPrefix: false },
    { path: "~/src/entities/story/ui", pathPrefix: false },
    { path: "~/src/features/filters/ui", pathPrefix: false },
    { path: "~/src/widgets", pathPrefix: false },
  ],
  css: ["~/src/app/styles/global.scss"],
});
