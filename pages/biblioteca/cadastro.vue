<script lang="ts" setup>
definePageMeta({
  layout: "landing",
  middleware: "auth",
  roles: ['admin'],
  isProtected: true,
});
useHead({
  title: 'Unidos no Senhor | Cadastro de Livros',
});

</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Cadastro de Livros</template>
      <template v-slot:desc>Falta colocar uma autenticação, mas por enquanto, é o que tem. Abraços.</template>
    </LandingSectionhead>

    <div class="grid md:grid-cols-1 gap-10 mx-auto max-w-4xl mt-16">
      <div>
        <LibraryRegisterBook/>
      </div>
    </div>
  </LandingContainer>
</template>
