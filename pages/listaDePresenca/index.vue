<script lang="ts" setup>
definePageMeta({
  layout: 'app',
  middleware: 'auth',
  roles: ['admin', 'obreiro'],
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
    <div v-if="opened.windows.checklist">
      <AttendanceCheckList />
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
