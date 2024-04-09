// https://nuxt.com/docs/api/configuration/nuxt-config
//import tailwindConfig from "./tailwind.config"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/apollo'
  ],
  googleFonts: {
    families: {
      'Noto Sans Lao': {
        wght: [100, 300, 400, 500, 700, 900],
      },
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100]
      },
    },
    display: 'swap'
  },
  css: ['@/assets/main.css'],
  tailwindcss: {
    exposeConfig: true,
    config: {
        theme: {
          extend: {
            colors: {
              'primary': '#002749',
            }
          }
        }
    },
  },
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: process.env.NHOST_GRAPHQL_URL + '',
        browserHttpEndpoint: '',
        wsEndpoint: '',
        httpLinkOptions: {},
        wsLinkOptions: {},
        wsEndpoint: '',
        websocketsOnly: false,
        connectToDevTools: false,
        defaultOptions: {},
        inMemoryCacheOptions: {},
        tokenName: 'token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      },
    }
  }
})
