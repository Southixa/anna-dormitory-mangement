// https://nuxt.com/docs/api/configuration/nuxt-config
//import tailwindConfig from "./tailwind.config"
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/apollo',
    'nuxt-icon',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
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
    // config: {
    //     theme: {
    //       extend: {
    //         colors: {
    //           'primary': '#002749',
    //         }
    //       }
    //     }
    // },
  },
  runtimeConfig: {
    public: { // For client-side access
      NHOST_SUBDOMAIN: process.env.NHOST_SUBDOMAIN + "",
      NHOST_REGION: process.env.NHOST_REGION + "",
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    },
  },
  ssr: false
})
