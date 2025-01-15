// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@nuxt/ui'],

  nitro: {
    experimental: {
      openAPI: true,
      database: true,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
})
