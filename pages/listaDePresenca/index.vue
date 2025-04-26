<script lang="ts" setup>
definePageMeta({
  layout: 'app',
  middleware: 'auth',
  roles: [1],
  isProtected: true,
});
useHead({
  title: 'Unidos no Senhor | Gerenciar Biblioteca',
});
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
</script>

<template>
  <div class="max-w-screen-2xl mx-auto px-5">
    <div class="mt-5">
      <button
        @click="opened.windows.checklist ? (opened.windows.checklist = false, opened.windows.listEvents = true) : $router.back()"
        class="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-3 py-1.5 bg-white border-2 border-black hover:bg-gray-100 text-black absolute top-1 left-1 sm:px-5 sm:py-2.5 sm:w-auto sm:h-auto">
        <span class="center hidden sm:inline">Voltar</span>
        <span class="center sm:hidden">
          <UIcon name="i-heroicons-arrow-left" />
        </span>
      </button>
    </div>
    <div v-if="opened.windows.checklist">
      <AttendanceCheckList />
    </div>

    <div v-if="opened.windows.listAttendances">
      <AttendanceListAttendances />
    </div>
    <div v-if="opened.windows.selectParticipantsToEvent">
      <AttendanceParticipantsList />
    </div>
    <div v-if="opened.windows.listEvents">
      <div class="overflow-y-auto h-1/2">
        <AttendanceEventList />
      </div>

      <div class="flex mt-5 ml-auto mr-auto justify-center">
        <AttendanceCreateEvent />
      </div>
    </div>
  </div>
</template>

<style></style>
