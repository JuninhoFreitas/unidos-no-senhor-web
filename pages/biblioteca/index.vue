<script setup>
const config = useRuntimeConfig();
import axios from 'axios';

definePageMeta({
  layout: 'landing',
});

// let bibliotecaMock = [
//   {
//     id: '930a8081-ec8d-4006-9000-6a2df2483904',
//     titulo: 'Cartas de um diabo para seu Aprendiz',
//     autor: 'C.S. Lewis',
//     editora: 'Thomas Nelson Brasil',
//     isbn: '9788578606264',
//     anoDeImpressao: 1942,
//     observacao: 'Livro muito bom, recomendo a leitura',
//   },
// ];
const { data: books, pending, error } = useAsyncData(
  'books',
  () => $fetch(`${config.public.baseUrl}/biblioteca`),
)
// axios
//   .request(options)
//   .then(function (response) {
//     biblioteca.value = response.data;
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Biblioteca</template>
      <template v-slot:desc>Se pegou um livro, avise aqui, se deseja registrar um livro, registre aqui também.</template>
      <!-- Create a button in the right of Biblioteca to register books -->
    </LandingSectionhead>
    <LandingLink size="lg" styleName="outline" rel="noopener" href="/biblioteca/cadastro" target="_blank">Registrar Livros</LandingLink>

      <div v-if="pending">Loading tracks...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else class="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
        <LandingBook v-for="item of books" :book="item" :key="item.id"/>
      </div>
    
  </LandingContainer>
</template>
