<script setup>
definePageMeta({
  layout: 'landing',
});
useHead({
  title: 'Unidos no Senhor | Biblioteca',
});

import { useDebounce } from '@vueuse/core';
const config = useRuntimeConfig();
const authenticated = useCookie('token')?.value ? true : false;

const { data: books, pending, error } = useAsyncData('books', () => $fetch(`${config.public.baseUrl}/libraries`));

const search = ref('');
const cachedBooks = [];
const debouncedSearch = useDebounce(search, 500);

const cleanObject = (obj) => {
  const cleaned = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      cleaned[key] = '';
    } else {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

onMounted(() => {
  if (books.value) {
    cachedBooks.push(...books.value);
  }
});
// Split the logic of this watcher into a function
// to make it easier to test
function filterBooks() {
  const searchValue = debouncedSearch.value.toLowerCase();
  const filteredBooks = books.value.filter((book) => {
    const cleanedBook = cleanObject(book);
    return (
      cleanedBook.titulo.toLowerCase().includes(searchValue) ||
      cleanedBook.autor.toLowerCase().includes(searchValue) ||
      cleanedBook.editora.toLowerCase().includes(searchValue) ||
      cleanedBook.isbn.toLowerCase().includes(searchValue) ||
      cleanedBook.anoDeImpressao.toString().includes(searchValue) ||
      cleanedBook.observacao.toLowerCase().includes(searchValue)
    );
  });
  books.value = filteredBooks;
}

watch(debouncedSearch, async () => {
  if (debouncedSearch.value) {
    filterBooks();
  } else {
    books.value = cachedBooks;
  }
});
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Biblioteca</template>
      <template v-slot:desc>Se pegou um livro, avise aqui, se deseja registrar um livro, registre aqui também.</template>
    </LandingSectionhead>
    <div class="mt-10 mx-auto flex justify-center">
      <input
        type="text"
        class="w-full px-4 py-2 ring-1 ring-gray-500 transition text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder="Pesquisar"
        v-model="search"
      />
    </div>

    <div class="mt-10 mx-auto flex justify-center">
      <a
        v-if="authenticated"
        href="/biblioteca/gerenciar"
        class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black"
        >Gerenciar Livros</a
      >
    </div>

    <div v-if="pending">Loading tracks...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div
      v-else
      class="grid gap-1 mx-auto grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-3 md:max-w-screen-lg xl:grid-cols-5 xl:max-w-screen-2xl"
    >
      <LandingBook v-for="item of books" :book="item" :key="item.id" class="w-full max-w-sm" />
    </div>
  </LandingContainer>
</template>
