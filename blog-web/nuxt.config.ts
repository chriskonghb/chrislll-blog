export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    ['@nuxtjs/tailwindcss', {
      config: {
        plugins: [
          require('@tailwindcss/typography')
        ]
      }
    }]
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },
});
