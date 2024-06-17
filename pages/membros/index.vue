<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
  middleware: 'auth',
  roles: ['admin'],
  isProtected: true,
});
useHead({
  title: 'Unidos no Senhor | Membros',
});
import { columnsTableMembers } from '@/constants/tableMembers';
import { useMemberStore } from '~/store/member';
import { useOpenedStore } from '~/store/openeds';

const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const membersStore = useMemberStore();

const registerIsOpen = ref(false);
const selected = ref([]);
const memberToUpdate = ref(null);
const q = ref('');

const { members } = storeToRefs(membersStore);
membersStore.listMembers();

function deleteMembers() {
  selected.value.forEach(async (row) => {
    await membersStore.deleteMember((row as { id: any }).id);
  });
}

const items = (row: { id: any; } | null) => [
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        if (row) {
          membersStore.deleteMember(row.id);
        }
      },
    },
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-20-solid',
      click: () => {
        memberToUpdate.value = row as { id: any } | null;
        opened.value.dialogs.updatedMember = true;
      },
    },
  ],
];

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
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Cadastro de Membros</h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="registerIsOpen = false" />
        </div>
      </template>
      <MemberRegisterMember action="create"></MemberRegisterMember>
      <Placeholder class="h-full" />
    </UCard>
  </UModal>
  <UModal v-model="opened.dialogs.updatedMember" fullscreen>
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
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Atualizar Membro</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="opened.dialogs.updatedMember = false"
          />
        </div>
      </template>
      <MemberRegisterMember action="update" :member-to-update="memberToUpdate"></MemberRegisterMember>
      <Placeholder class="h-full" />
    </UCard>
  </UModal>

  <div class="max-w-screen-2xl mx-auto h-[calc(100vh-10rem)] px-5">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre membros..." />
      <UButton label="Cadastrar membro" class="ml-3" @click="registerIsOpen = true" />
      <UButton label="Excluir" class="ml-3 bg-red-600" @click="deleteMembers" />
    </div>
    <div class="h-full overflow-auto">
      <UTable
        v-model="selected"
        :rows="filteredRows"
        :columns="columnsTableMembers"
        class="border ring-1 ring-green-200 focus:ring-primary-500 h-full w-full"
      >
        <template #name-data="{ row }">
          <span :class="[selected.find((person) => person.id === row.id) ? 'text-primary-500 dark:text-primary-400' : '']">{{
            row.nome
          }}</span>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </div>
  </div>
</template>

<style></style>
