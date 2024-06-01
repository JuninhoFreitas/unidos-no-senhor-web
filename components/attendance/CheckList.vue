<script lang="ts" setup>
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
    <div v-for="person in filteredRows" :key="person.id" class="flex justify-between items-center border-b py-2">
      <span :class="[selectedParticipants.find((p) => p.id === person.id) && 'text-primary-500 dark:text-primary-400']">
        {{ person.nome }}
      </span>
      <UButton @click="select(person)">
        {{ selectedParticipants.find((p) => p.id === person.id) ? 'Desmarcar' : 'Presente' }}
      </UButton>
    </div>
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
