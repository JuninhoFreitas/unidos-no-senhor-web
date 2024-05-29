<script setup>
import { useMyAuthStore } from '~/store/auth';

const authStore = useMyAuthStore();
const { show_login_window } = storeToRefs(authStore);
</script>
<template>
  <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
    <div class="pt-5 md:p-24 order-1 sm:block sm:order-1 md:order-1 md:block z-0">
      <img
        class="hover:scale-105 rounded-full transition-transform transform sm:hover:scale-125"
        src="~/assets/img/logo.png"
        alt="Starship starts the engine"
        loading="eager"
        format="avif"
        width="400"
        height="400"
      />
    </div>
    <!-- This div should be hidden if show_login_window is false -->
    <div v-if="show_login_window" class="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <!-- Render here the window of login -->
      <LandingLogin></LandingLogin>
    </div>
    <div>
      <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">Igreja Bíblica Unidos no Senhor</h1>
      <p class="text-lg mt-4 text-slate-600 max-w-xl">
        Amando a Deus e as pessoas<br />
        Servindo a Deus e as pessoas.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <template v-for="link in links">
          <a
            :href="link.href"
            class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black"
            >{{ link.text }}</a
          >
        </template>
      </div>
    </div>
  </main>
</template>
