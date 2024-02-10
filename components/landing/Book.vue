<script setup>
defineProps(["book"]);
</script>

<template>
  <div>
    <div
      class="flex flex-col w-full order-first lg:order-none border-2 border-[#D8DEE9] border-opacity-50 py-5 px-6 rounded-md"
    >
      <div class="text-center">
        <h4 class="text-lg font-medium text-gray-100">{{ book.autor }}</h4>
        <p class="mt-3 text-4xl font-bold text-black md:text-4xl">
          {{ book.titulo }}
        </p>
        <h4 class="text-lg font-medium text-gray-400">{{ book.editora }}</h4>
        <h4 class="text-sm font-thin text-gray-400">ISBN: {{ book.isbn }}</h4>
        <h4 class="text-lg font-thin text-gray-400">{{ book.anoDeImpressao }}</h4>
        
      </div>
      <div class="grid mt-8 text-left gap-y-4">
        <!-- Description of the book-->

        <h4 class="text-pretty font-extralight text-black">"{{ book.observacao }}"</h4>



      </div>
      <div class="flex mt-8">
        <LandingLink
          :href="book.id || '#'"
          block
          :styleName="'outline'"
        >
          {{ book?.disponivel ? "Reservar" : "Indisponível"}}
        </LandingLink>
      </div>
    </div>
  </div>
</template>
