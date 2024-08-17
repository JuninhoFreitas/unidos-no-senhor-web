<template>
  <div>
    <h1>
      {{ nome }}
    </h1>
    <button class="bg-slate-600" @click="alteraNome">Clique aqui</button>
  </div>
</template>

<script setup>
import { useOpenedStore } from '~/store/openeds';

const openedStore = useOpenedStore();
const { nome } = storeToRefs(openedStore);
let i = 0;

function alteraNome() {
  nome.value = 'Maria +' + i++;
  console.log(nome.value);
}
</script>

<style></style>
