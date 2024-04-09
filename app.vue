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
    },
    Select: {
      peers: {
        InternalSelection: {
          textColor: '#FF0000'
        }
      }
    }
    // ...
  }

</script>