<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div v-if="show_login_window" class="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <!-- Render here the window of login -->
      <LandingLogin></LandingLogin>
    </div>
</template>
<script setup>
import { useMyAuthStore } from '~/store/auth';
const authStore = useMyAuthStore()
const { show_login_window  } = storeToRefs(authStore)
</script>
