<script lang="ts" setup>
import { columnsTableAttendance } from '@/constants/tableAttendance';
import { useAttendanceStore } from '~/store/attendance';
import { useEventsStore } from '~/store/events';
import { useOpenedStore } from '~/store/openeds';
const eventsStore = useEventsStore();
const { selectedEvent } = storeToRefs(eventsStore);
const attendanceStore = useAttendanceStore();
const { participants, selectedParticipants } = storeToRefs(attendanceStore);
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
attendanceStore.listParticipants();

await attendanceStore.listAllChecked(selectedEvent.value.id);

const q = ref('');

// Função para Atualizar a Lista de Presença
const createAttendance = async () => {
  opened.value.dialogs.updatedParticipant = true;
  if (selectedParticipants.value) {
    const selectedIds = selectedParticipants.value.map((person) => person.id);
    await attendanceStore.createAttendance(selectedIds, selectedEvent.value.id);
  }
};

// Função para Filtrar Pessoas
const select = (person) => {
  const index = selectedParticipants.value.findIndex((p) => p.id === person.id);
  if (index === -1) {
    selectedParticipants.value.push(person);
  } else {
    selectedParticipants.value.splice(index, 1);
  }
};
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
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mt-5">{{ selectedEvent.nome }}</h1>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre Pessoas..." />
      <UButton label="+" class="ml-3" @click="console.log(selectedParticipants)" />
    </div>
    <UTable
      v-model="selectedParticipants"
      :rows="filteredRows"
      :columns="columnsTableAttendance"
      class="border ring-1 ring-green-200 focus:ring-primary-500"
      style="height: 70vh"
      @select="select"
    >
      <template #nome-data="{ row }">
        <span :class="[selectedParticipants.find((person) => person.id === row.id) && 'text-primary-500 dark:text-primary-400']">{{
          row.nome
        }}</span>
      </template>
    </UTable>
    <UModal v-model="opened.dialogs.updatedParticipant">
      <!-- Create a alert to success -->
      <UAlert
        class="text-black"
        color="black"
        title="Presenças Salvas"
        message="Lista de presença atualizada com sucesso"
        @close="opened.dialogs.updatedParticipant = false"
      >
      </UAlert>
    </UModal>
    <UButton
      class="flex items-end justify-center mt-5 mx-auto"
      color="primary"
      variant="outline"
      icon="i-heroicons-plus-20-solid"
      @click="createAttendance"
    >
      Confirmar Presença
    </UButton>
  </div>
</template>

<style></style>
