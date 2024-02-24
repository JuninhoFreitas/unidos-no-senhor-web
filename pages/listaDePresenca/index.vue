<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
  middleware: 'auth',
  roles: ['admin'],
  isProtected: true,
});
useHead({
  title: 'Unidos no Senhor | Gerenciar Biblioteca',
});
import { columnsTableAttendance } from '@/constants/tableAttendance';
import { useAttendanceStore } from '~/store/attendance';
import { useOpenedStore } from '~/store/openeds';

const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const attendanceStore = useAttendanceStore();
const { participants, selectedParticipants } = storeToRefs(attendanceStore);
attendanceStore.listParticipants();
//TODO: Colocar isso aqui como variável

const registerIsOpen = ref(false);
const selected = ref([]);
const bookToUpdate = ref(null);
const q = ref('');

const filteredRows = computed(() => {
  if (!q.value) {
    return participants.value;
  }

  return participants.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});
watch(selected, (value) => {
  console.log('Value: ', value);
  console.log('Actual: ', selected.value);
});
onMounted(async () => {
  await attendanceStore.listAllChecked('8e4947c4-c98e-457e-83c3-6720e9ee4e51');

  console.log({
    selectedParticipants: selectedParticipants.value,
    selected: selected.value,
  });
  selected.value = selectedParticipants.value;
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto px-5">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre Pessoas..." />
      <UButton label="+" class="ml-3" @click="console.log(selectedParticipants)" />
    </div>
    <UTable
      v-model="selectedParticipants"
      :rows="filteredRows"
      :columns="columnsTableAttendance"
      class="border ring-1 ring-green-200 focus:ring-primary-500"
    >
      <template #nome-data="{ row }">
        <span :class="[selectedParticipants.find((book) => book.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
          row.nome
        }}</span>
        <!-- When book have the property "reservado" false  should format the field "reservado" to the text color red-->
      </template>
      <template #reservado-data="{ row }">
        <span :class="[row.reservado ? 'text-gray-500 dark:text-white-400' : 'text-primary-500 dark:text-primary-400']">{{
          row.reservado ? 'Sim' : 'Não'
        }}</span>
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <!-- Create a floating button at the bottom side of the site using UButton, it should be centralized -->
    <UButton
      class="fixed inset-0 flex items-end justify-center bottom-5"
      color="primary"
      variant="contained"
      icon="i-heroicons-plus-20-solid"
      @click=""
    >
      Confirmar Presença
    </UButton>
  </div>
</template>

<style></style>
