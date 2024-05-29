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
      <div class="flex mt-6 gap-3 flex-col sm:flex-row">
        <template v-for="link in links">
          <a
            :href="link.href"
            class="px-5 py-2.5 text-black bg-white border-2 border-black rounded text-center transition hover:bg-gray-100 focus-visible:ring-2 ring-offset-2 ring-gray-200"
            :class="{ hidden: link.auth && !authenticated }"
            >{{ link.text }}</a
          >
        </template>
      </div>
    </div>
  </main>
</template>
