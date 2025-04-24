<script setup>
definePageMeta({
  layout: 'landing',
});
useHead({
  title: 'Igreja Bíblica | Novo Hamburgo | Unidos no Senhor',
});
const pwa = usePWA()
</script>

<template>
  <LandingContainer>
    <ClientOnly>
      PWA Installed: {{ $pwa?.isPWAInstalled }}
      PWA Installed: {{ pwa?.isPWAInstalled }}
    </ClientOnly>
    <LandingHero></LandingHero>
  </LandingContainer>
</template>
