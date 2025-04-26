<script lang="ts" setup>
import { useAttendanceStore } from '@/store/attendance';
import { useEventsStore } from '@/store/events';
import { useParticipantStore } from '@/store/participant';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const eventsStore = useEventsStore();
const attendanceStore = useAttendanceStore();
const participantStore = useParticipantStore();
const { events, selectedEvent } = storeToRefs(eventsStore);
const { opened } = storeToRefs(openedStore);
await eventsStore.listEvents();
const selectEvent = async (event: any) => {
  selectedEvent.value = event;
  console.log('Evento selecionado: ', selectedEvent.value);
  opened.value.windows.listEvents = false;
  await attendanceStore.listAttendancesByEvent(selectedEvent.value.id);
  const allowedParticipants = await participantStore.listAllowedParticipants({ eventId: selectedEvent.value.id });
  if (allowedParticipants.length === 0) {
    console.log('allowedParticipants', allowedParticipants);
    console.log('selectedEvent.value', selectedEvent.value);
    opened.value.windows.selectParticipantsToEvent = true;
    return opened.value.windows.listEvents = false;
  }
  console.log('allowedParticipants', allowedParticipants);
  opened.value.windows.listAttendances = true;
};
</script>
<template>
  <div class="max-h-screen">
    <h1 class="text-3xl font-bold text-center mt-5">Eventos</h1>
    <UCard class="overflow-y-auto" style="height: 70vh">
      <div class="flex-row max-h-fit">
        <div v-for="event in events" :key="event.id" class="max-w-full p-4">
          <UCard class="z-10">
            <UIcon name="i-heroicons-trash" class="float-right hover:bg-red-500"
              @click="eventsStore.deleteEvent(event.id)" />
            <div @click="selectEvent(event)">
              <h2 class="text-xl font-bold">{{ event.nome }}</h2>
              <p class="text-sm">{{ event.descricao }}</p>
            </div>
          </UCard>
        </div>
      </div>
    </UCard>
  </div>
</template>
<style></style>
