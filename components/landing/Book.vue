<script setup>
defineProps(["book"]);
</script>

<template>
  <div>
    <div
      class="flex flex-col w-full order-first lg:order-none border-2 border-[#D8DEE9] border-opacity-50 py-5 px-6 rounded-md"
    >
      <div class="text-center">
        <h4 class="text-sm lg:text-md font-medium text-gray-800">{{ book.autor }}</h4>
        <p class="mt-1 text-xl font-bold text-black md:text-2xl">
          {{ book.titulo }}
        </p>
        <h4 class="text-lg font-medium text-gray-500">{{ book.editora }}</h4>
        <h4 class="text-sm font-thin text-gray-600">ISBN: {{ book.isbn }}</h4>
        <h4 class="text-lg font-thin text-gray-700">{{ book.anoDeImpressao }}</h4>
      </div>
      <div class="grid mt-2 text-left">
        <h4 class="text-pretty font-extralight text-black">{{ book.observacao }}</h4>
      </div>
      <div class="flex mt-8">
        <!-- Botão para reservar um livro
          - Deve usar uma classe do tailwind para estilizar o botão
          - Deve verificar se book.reservado é true ou false
          - Se for true, o botão deve estar desabilitado e a cor deve ser cinza
          - Se for false, o botão deve estar habilitado e a cor deve ser verde
         -->
        <button
          class="w-full py-3 text-white font-bold bg-green-600 rounded-md"
          :disabled="book.reservado"
        >
          {{ book.reservado ? "Reservado" : "Reservar" }}
        </button>
        
      </div>
    </div>
  </div>
</template>
