<script setup>
import { useMyAuthStore } from '~/store/auth';
import { useLibraryStore } from '~/store/library';

// On load, show the latest book cover
const libraryStore = useLibraryStore();
const books = storeToRefs(libraryStore);
const bookCover = ref('');
onMounted(async () => {
  const latestBook = await libraryStore.getBook('eda096d2-d8bd-4443-a140-b4be43229810');

  console.log('latestBook', latestBook);
  bookCover.value = latestBook?.observacao;
});
const authStore = useMyAuthStore();
const { user, show_login_window, is_authenticated } = storeToRefs(authStore);
</script>

<template>
  <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
    <div class="p-24 md:order-1 hidden md:block">
      <img
        class="rounded-full transition-transform transform hover:scale-125"
        src="~/assets/img/logo.png"
        alt="Starship starts the engine"
        loading="eager"
        format="avif"
        width="400"
        height="400"
      />
    </div>
    <!-- <div class="pt-5 md:p-24 order-1 sm:block sm:order-1 md:order-1 md:block z-0 sm:hidden">
      <img
        class="hover:scale-105 rounded-full transition-transform transform sm:hover:scale-125 hidden"
        src="~/assets/img/logo.png"
        alt="Capa do último Livro"
        loading="eager"
        format="avif"
        width="400"
        height="400"
      />
    </div> -->

    <!-- Create a div with a image to show the latest book cover -->
    <!-- <div class="order-1 p-24 h-0.5">
      <img class="rounded-lg" :src="bookCover" alt="Starship starts the engine" loading="eager" format="avif" width="400" height="400" />
    </div> -->

    <!-- This div should be hidden if show_login_window is false -->
    <div v-if="show_login_window" class="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <!-- Render here the window of login -->
      <LandingLogin></LandingLogin>
    </div>
    <div>
      <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">Igreja Bíblica Unidos no Senhor</h1>
      <p class="text-lg mt-4 text-black font-bold max-w-xl font-sans">
        Amando a Deus e as pessoas<br />
        Servindo a Deus e as pessoas.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href="/membros"
          class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black"
          >Membros</a
        >
        <a
          href="/biblioteca"
          class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black"
          >Biblioteca</a
        >
        <a
          href="/biblioteca/cadastro"
          class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black"
          >Registrar Livros</a
        >
      </div>
    </div>
  </main>
</template>
