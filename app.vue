<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <naive-config>
      <n-message-provider>
        <NuxtLayout>
          <NuxtPage/>
        </NuxtLayout>
      </n-message-provider>
    </naive-config>
  </n-config-provider>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>


<script setup>

const themeOverrides = {
    common: {
      primaryColor: '#002749',
    },
    Input: {
    borderHover: `1px solid #002749`,
    borderFocus: `1px solid #002749`
  },
    Button: {
      textColor: '#002749',
      borderHover: `1px solid #94A3B8`,
      borderFocus: `1px solid #94A3B8`,
    },
    InternalSelection: {
      borderHover: `1px solid #002749`,
      borderFocus: `1px solid #002749`
    },
    // ...
  }

</script>