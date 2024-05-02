// https://nuxt.com/docs/api/configuration/nuxt-config
//import tailwindConfig from "./tailwind.config"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/apollo',
    'nuxt-icon'
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
        websocketsOnly: false,
        connectToDevTools: false,
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
          },
          query: {
            fetchPolicy: 'no-cache',
          },
        },
        inMemoryCacheOptions: {},
        tokenName: 'token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      },
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: { // For client-side access
      NHOST_SUBDOMAIN: process.env.NHOST_SUBDOMAIN + "",
      NHOST_REGION: process.env.NHOST_REGION + "",
      TOKEN_NANE: process.env.TOKEN_NANE + "",
    },
  },
  ssr: false
})
