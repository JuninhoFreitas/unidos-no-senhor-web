<script lang="ts" setup>
import { useEventsStore } from '@/store/events';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const eventsStore = useEventsStore();
const { events, selectedEvent } = storeToRefs(eventsStore);
const { opened } = storeToRefs(openedStore);
await eventsStore.listEvents();
const selectEvent = (event) => {
  selectedEvent.value = event;
  console.log('Evento selecionado: ', selectedEvent.value);
  opened.value.windows.listEvents = false;
  opened.value.windows.checklist = true;
};
</script>
<template>
  <div class="max-h-screen">
    <h1 class="text-3xl font-bold text-center mt-5">Eventos</h1>
    <!-- Crie um card que englobe a listagem dos evento e ocupe no máximo 80% da altura
    caso a lista seja maior que 80% da altura, deve ser possível rolar a lista
    -->
    <UCard class="overflow-y-auto" style="height: 70vh">
      <div class="flex-row max-h-fit">
        <div v-for="event in events" :key="event.id" class="max-w-full p-4">
          <UCard class="z-10">
            <UIcon name="i-heroicons-trash" class="float-right hover:bg-red-500" @click="eventsStore.deleteEvent(event.id)" />
            <div @click="selectEvent(event)">
              <h2 class="text-xl font-bold">{{ event.nome }}</h2>
              <p class="text-sm">{{ event.descricao }}</p>
              <p class="text-sm">{{ event.data }}</p>
            </div>
            <!-- </UCard> -->
            <!-- Create a "X" red button to delete the event -->
          </UCard>
        </div>
      </div>
    </UCard>
  </div>
</template>
<style></style>
