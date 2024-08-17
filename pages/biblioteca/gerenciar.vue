<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
  middleware: 'auth',
  roles: ['Admin'],
  isProtected: true,
});
useHead({
  title: 'Unidos no Senhor | Gerenciar Biblioteca',
});
import { columnsTableBooks } from '@/constants/tableBooks';
import { useLibraryStore } from '~/store/library';
import { useOpenedStore } from '~/store/openeds';

const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const booksStore = useLibraryStore();

const registerIsOpen = ref(false);
const selected = ref([]);
const bookToUpdate = ref(null);
const q = ref('');

const { books } = storeToRefs(booksStore);
booksStore.listBooks();

function deleteMembers() {
  selected.value.forEach(async (row) => {
    await booksStore.deleteBook(row.id);
  });
}

const items = (row) => [
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => booksStore.deleteBook(row.id),
    },
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-20-solid',
      click: () => {
        bookToUpdate.value = row;
        opened.value.dialogs.updatedBook = true;
      },
    },
  ],
];

const filteredRows = computed(() => {
  if (!q.value) {
    return books.value;
  }

  return books.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
</script>

<template>
  <UModal v-model="registerIsOpen" fullscreen>
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
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Cadastro de Livros</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="registerIsOpen = false" />
        </div>
      </template>
      <LibraryRegisterBook2 action="create"></LibraryRegisterBook2>
    </UCard>
  </UModal>
  <UModal v-model="opened.dialogs.updatedBook" fullscreen>
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
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Atualizar Livro</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="opened.dialogs.updatedBook = false"
          />
        </div>
      </template>
      <LibraryRegisterBook2 action="update" :book-to-update="bookToUpdate"></LibraryRegisterBook2>
    </UCard>
  </UModal>

  <div class="max-w-screen-2xl mx-auto px-5">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre Livros..." />
      <UButton label="Cadastrar Livro" class="ml-3" @click="registerIsOpen = true" />
      <UButton label="Excluir" class="ml-3 bg-red-600" @click="deleteMembers" />
    </div>
    <UTable
      v-model="selected"
      :rows="filteredRows"
      :columns="columnsTableBooks"
      class="border ring-1 ring-green-200 focus:ring-primary-500"
    >
      <template #titulo-data="{ row }">
        <span :class="[selected.find((book) => book.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
          row.titulo
        }}</span>
        <!-- When book have the property "reservado" false  should format the field "reservado" to the text color red-->
      </template>
      <template #reservado-data="{ row }">
        <span :class="[row.reservado ? 'text-gray-500 dark:text-white-400' : 'text-primary-500 dark:text-primary-400']">{{ row.reservado ? 'Sim' : 'Não' }}</span>
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
