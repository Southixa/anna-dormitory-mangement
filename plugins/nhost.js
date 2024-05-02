import { NhostClient } from "@nhost/vue";
export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const nhost = new NhostClient({
        subdomain: runtimeConfig.public.NHOST_SUBDOMAIN,
        region: runtimeConfig.public.NHOST_REGION
    });
    nuxtApp.vueApp.use(nhost)
  })