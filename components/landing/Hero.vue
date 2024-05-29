<script setup>
import { useMyAuthStore } from '~/store/auth';

const links = [
  { href: '/membros', text: 'Membros' },
  { href: '/biblioteca', text: 'Biblioteca' },
  { href: '/biblioteca/cadastro', text: 'Registrar Livros', auth: true },
];

const authStore = useMyAuthStore();
const { show_login_window, authenticated } = storeToRefs(authStore);
</script>
<template>
  <main class="grid place-items-center pt-16 pb-8 md:pt-8 lg:grid-cols-2">
    <div class="z-0 order-1 pt-5 sm:block sm:order-1 md:p-24 md:order-1 md:block"></div>
    <div v-if="show_login_window" class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <LandingLogin></LandingLogin>
    </div>
    <div>
      <h1 class="text-5xl font-bold lg:text-6xl xl:text-7xl lg:tracking-tight">Igreja Unidos no Senhor</h1>
      <p class="text-lg mt-4 max-w-xl text-slate-600">
        Amando a Deus e as pessoas<br />
        Servindo a Deus e as pessoas.
      </p>
      <div class="flex mt-6 gap-3 flex-col sm:flex-row"></div>
    </div>
  </main>
</template>
