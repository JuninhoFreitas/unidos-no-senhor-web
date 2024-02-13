<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
  middleware: 'auth',
});
useHead({
  title: "Unidos no Senhor | Membros",
});
import {columnsTableMembros} from '@/constants/tableMembros';
import { useMyMembrosStore } from '~/store/membros';
const membrosStore = useMyMembrosStore();

const isOpen = ref(false);
const selected = ref([]);
const q = ref('');

const { membros } = storeToRefs(membrosStore);
membrosStore.listMembros();

function deleteMembros(){
  selected.value.forEach(async (row)=>{
    await membrosStore.deleteMembro(row.id)
  })
}

const items = (row) => [
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => membrosStore.deleteMembro(row.id)
  },
]
]

const filteredRows = computed(() => {
  if (!q.value) {
    return membros.value;
  }

  return membros.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>

<template>
  <UModal v-model="isOpen" fullscreen>
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Cadastro de Membros</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
        </div>
      </template>
      <LandingRegisterMember></LandingRegisterMember>
      <Placeholder class="h-full" />
    </UCard>
  </UModal>

  <div class="max-w-screen-2xl mx-auto px-5">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre membros..." />
      <UButton label="Cadastrar membro" class="ml-3" @click="isOpen = true" />
      <UButton label="Excluir" class="ml-3 bg-red-600" @click="deleteMembros" />
    </div>
    <UTable  v-model="selected" :rows="filteredRows" :columns="columnsTableMembros" class="border ring-1 ring-green-200 focus:ring-primary-500" >
      <template #name-data="{ row }">
      <span :class="[selected.find(person => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{ row.nome }}</span>
    </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  </div>
</template>

<style></style>
