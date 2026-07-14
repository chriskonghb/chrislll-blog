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
  // 禁用 Nitro 服务端缓存，确保每次请求都重新渲染
  nitro: {
    routeRules: {
      '/**': { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0' } },
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
