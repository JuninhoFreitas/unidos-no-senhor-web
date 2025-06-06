<script lang="ts" setup>
import { useAttendanceStore } from '~/store/attendance';
import { useEventsStore } from '~/store/events';
import { useOpenedStore } from '~/store/openeds';
import { useParticipantStore } from '~/store/participant';
const eventsStore = useEventsStore();
const { selectedEvent } = storeToRefs(eventsStore);
const attendanceStore = useAttendanceStore();
const { selectedParticipants, selectedAttendance } = storeToRefs(attendanceStore);
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const participantStore = useParticipantStore();
const { allowedParticipants } = storeToRefs(participantStore);
await participantStore.listAllowedParticipants({ eventId: selectedEvent.value.id });
const { participants } = storeToRefs(attendanceStore);
participants.value = allowedParticipants.value;

await attendanceStore.listAllChecked(selectedAttendance.value.code);

// Estado Atual	Texto no Botão	Cor do Botão (Hex Exemplo)	Significado da Cor
// Não Marcado	"Não Marcado" ou "Marcar"	Cinza (#808080)	Neutro / Ação Pendente
// Presente	"Presente"	Verde (#28a745)	Confirmação / Sim
// Ausente	"Ausente"	Vermelho (#dc3545)	Negação / Não
const statesMap = {
  'present': {
    color: 'bg-green-500',
    text: 'Presente'
  },
  'absent': {
    color: 'bg-red-500',
    text: 'Ausente'
  }
}
const q = ref('');
const sortByPresence = ref(true); // Add this line to track sorting method
const sortAscending = ref(true);

// Função para Atualizar a Lista de Presença
const createAttendance = async () => {
  opened.value.dialogs.updatedParticipant = true;
  if (selectedParticipants.value) {
    const selectedIds = selectedParticipants.value.map((person) => person.participante);
    await attendanceStore.createAttendance({
      participante: selectedIds,
      evento: selectedAttendance.value.evento,
      code: selectedAttendance.value.code,
      date: selectedAttendance.value.date
    });
  }
};

// Função para Filtrar Pessoas
const select = (person) => {
  console.log('person', person);
  const index = selectedParticipants.value.findIndex((p) => p.participante === person.participante);
  if (index === -1) {
    selectedParticipants.value.push(person);
  } else {
    selectedParticipants.value.splice(index, 1);
  }
};
const filteredRows = computed(() => {
  if (!q.value) {
    return allowedParticipants.value;
  }

  return allowedParticipants.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const sortFilteredRowsByName = computed(() => {
  const sorted = filteredRows.value.sort((a, b) => {
    const comparison = a.nome.localeCompare(b.nome);
    return sortAscending.value ? comparison : -comparison;
  });
  console.log('sorted', sorted);
  return sorted;
})
const sortFilteredRowsByPresence = computed(() => {
  const presence = selectedParticipants.value.map((p) => p.participante);
  const sorted = filteredRows.value.sort((a, b) => {
    const comparison = presence.indexOf(a.participante) - presence.indexOf(b.participante);
    return sortAscending.value ? comparison : -comparison;
  });
  console.log('sorted', sorted);
  return sorted;
})

// Add this computed property to determine which sorting to use
const sortedRows = computed(() => {
  return sortByPresence.value ? sortFilteredRowsByPresence.value : sortFilteredRowsByName.value;
})
onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
});
const editParticipants = async () => {
  opened.value.windows.listEvents = false;
  opened.value.windows.listAttendances = false;
  opened.value.windows.checklist = false;
  opened.value.windows.selectParticipantsToEvent = true;
}
const windowWidth = ref(window.innerWidth);
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-center mt-5">{{ selectedEvent.nome }}</h1>

    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filtre Pessoas..." />
      <div class="flex items-center ml-3">
        <UButton :label="sortByPresence ? 'Ordenar por Presença' : 'Ordenar por Nome'" class="mr-2"
          @click="sortByPresence = !sortByPresence" :color="sortByPresence ? 'gray' : 'gray'" />
        <UButton :icon="sortAscending ? 'i-heroicons-arrow-up-20-solid' : 'i-heroicons-arrow-down-20-solid'"
          variant="ghost" class="px-2" @click="sortAscending = !sortAscending" />
      </div>
    </div>

    <div v-for="person in sortedRows" :key="person.participante" :class="[
      'flex justify-between items-center border-b py-2',
      selectedParticipants.find((p) => p.participante === person.participante) ? 'bg-gray-100' : ''
    ]">
      <span
        :class="[selectedParticipants.find((p) => p.participante === person.participante) && 'text-black dark:text-primary-400']">
        {{ person.participant_nome }}
      </span>
      <UButton
        :class="[selectedParticipants.find((p) => p.participante === person.participante) ? statesMap.present.color : statesMap.absent.color]"
        @click="select(person)"
        :style="{ backgroundColor: selectedParticipants.find((p) => p.participante === person.participante) ? statesMap.present.color : statesMap.absent.color }">
        {{selectedParticipants.find((p) => p.participante === person.participante) ? statesMap.present.text :
          statesMap.absent.text}}
      </UButton>
    </div>
    <UModal v-model="opened.dialogs.updatedParticipant">
      <!-- Create a alert to success -->
      <UAlert class="text-black" color="black" title="Presenças Salvas"
        message="Lista de presença atualizada com sucesso" @close="opened.dialogs.updatedParticipant = false">
      </UAlert>
    </UModal>
    <UButton class="flex items-end justify-center mt-5 mx-auto fixed bottom-0 left-0 right-0" color="primary"
      icon="i-heroicons-plus-20-solid" @click="createAttendance">
      Confirmar Presença
    </UButton>
  </div>
  <div class="h-16"></div>
</template>

<style></style>