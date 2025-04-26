<script lang="ts" setup>
type ParticipantType = {
  id: string,
  membro_id: string,
  nome: string,
  selected: boolean,
  __entity: string
}

import { useEventsStore } from '@/store/events';
import { useParticipantStore } from '@/store/participant';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const eventsStore = useEventsStore();
const participantStore = useParticipantStore();
const { events, selectedEvent } = storeToRefs(eventsStore);
const { opened } = storeToRefs(openedStore);
const { existingParticipants, allowedParticipants } = storeToRefs(participantStore);
const selectedParticipants: { value: ParticipantType['id'][] } = ref([]);
const eventId = ref('');
const allowedParticipantsList = ref([]);
await participantStore.listParticipants();

const allowParticipants = async () => {
  opened.value.windows.listEvents = false;
  selectedParticipants.value = existingParticipants.value.filter((participant: ParticipantType) => participant.selected).map((participant: ParticipantType) => participant.id);
  await participantStore.allowParticipantsInEvent({
    evento: eventId.value,
    participantes: selectedParticipants.value
  });
  opened.value.windows.selectParticipantsToEvent = false;
  opened.value.windows.listAttendances = true;
};
onMounted(async () => {
  eventId.value = selectedEvent.value?.id || 'naoselecionado';
  allowedParticipantsList.value = (await participantStore.listAllowedParticipants({ eventId: eventId.value }))
  if (existingParticipants.value.length > 0) {
    existingParticipants.value.forEach((participant: ParticipantType) => {

      if (allowedParticipantsList.value.includes(participant.id)) {
        participant.selected = true;
      } else {
        participant.selected = false;
      }
    });
  }
});
</script>
<template>
  <div class="max-h-screen">
    <h3 class="text-center text-2xl font-bold">Evento: {{ selectedEvent?.nome }}</h3>
    <h1 class="text-3xl font-bold text-center mt-5">Autorizar de Participantes</h1>
    <UCard class="overflow-y-auto" style="height: 70vh">
      <div class="flex-row max-h-fit">
        <div v-for="participant in existingParticipants" :key="participant.id" class="max-w-full flex-row p-4">
          <UCard class="z-10 flex-row ">
            <div class="flex flex-row justify-between items-center">
              <h2 class="text-xl  font-bold">{{ participant?.nome }}</h2>
              <UToggle v-model="participant.selected" />
            </div>
          </UCard>
        </div>
      </div>
      <UButton label="Autorizar" @click="allowParticipants" />
    </UCard>
  </div>
</template>
<style></style>
