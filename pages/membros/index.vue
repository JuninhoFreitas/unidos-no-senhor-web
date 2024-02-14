
<!-- /** 
 * In the top of the page should have a title "Cadastro de Membros"
 * Above the form should have 3 cards with the following information:
 * - Total de Membros
 * - Membros Ativos
 * - Membros Inativos
 * 
 * The page should have a button to list all members
 * The page should have a button to list all members that are active
 * The page should have a button to list all members that are inactive
 * 
 * The page should have a left menu with the following options:
 * - Pagina Inicial
 * - Biblioteca
 * - Membros
 *   - Cadastro
 *   - Listagem
 * This menu should be hidden in mobile
 * 
 * 
 * **/ -->
<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
  middleware: 'auth',
  roles: ['admin'],
  isProtected: true,
});
useHead({
  title: "Unidos no Senhor | Membros",
});
import { columnsTableMembers } from '@/constants/tableMembers';
import { useMemberStore } from '~/store/member';
const membersStore = useMemberStore();

const isOpen = ref(false);
const selected = ref([]);
const q = ref('');

const { members } = storeToRefs(membersStore);
membersStore.listMembers();

function deleteMembers(){
  selected.value.forEach(async (row)=>{
    await membersStore.deleteMember(row.id)
  })
}

const items = (row) => [
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => membersStore.deleteMember(row.id)
  },
]
]

const filteredRows = computed(() => {
  if (!q.value) {
    return members.value;
  }

  return members.value.filter((person) => {
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
      <MemberRegisterMember></MemberRegisterMember>
      <Placeholder class="h-full" />
    </UCard>
  </UModal>

  <div class="max-w-screen-2xl mx-auto px-5">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre membros..." />
      <UButton label="Cadastrar membro" class="ml-3" @click="isOpen = true" />
      <UButton label="Excluir" class="ml-3 bg-red-600" @click="deleteMembers" />
    </div>
    <UTable  v-model="selected" :rows="filteredRows" :columns="columnsTableMembers" class="border ring-1 ring-green-200 focus:ring-primary-500" >
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

<style></style>~/constants/tableMembers