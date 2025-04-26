<script lang="ts" setup>
import { useAttendanceStore } from '@/store/attendance';
import { useEventsStore } from '@/store/events';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const eventsStore = useEventsStore();
const attendanceStore = useAttendanceStore();
const { events, selectedEvent } = storeToRefs(eventsStore);
const { attendancesByEvent, selectedAttendance } = storeToRefs(attendanceStore);
const { opened } = storeToRefs(openedStore);
const eventName = ref('');
await attendanceStore.listAttendancesByEvent(selectedEvent.value.id);
console.log('Eve2nto selecionado: ', selectedEvent.value);
const selectAttendance = (attendance) => {
  selectedAttendance.value = attendance;
  console.log('Presença selecionada: ', selectedAttendance.value);
  opened.value.windows.listEvents = false;
  opened.value.windows.listAttendances = false;
  opened.value.windows.checklist = true;
};
onMounted(() => {
  console.log('Eve2nto selecionado: ', selectedEvent.value);
  console.log('Presença selecionada: ', selectedAttendance.value);
  eventName.value = selectedEvent.value.nome;
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
  <div class="max-h-screen">
    <h1 class="text-3xl font-bold text-center mt-5">{{ eventName }}</h1>
    <UCard class="overflow-y-auto" style="height: 70vh">
      <h1 class="text-2xl font-bold text-center mb-5">Listas de Presença</h1>
      <UButton icon="i-heroicons-pencil" :label="windowWidth < 768 ? '' : 'Editar Participantes'"
        @click="editParticipants" class="float-right" />
      <div class="flex-row max-h-fit">
        <div v-for="attendance in attendancesByEvent" :key="attendance.id" class="max-w-full p-4">
          <UCard class="z-10">
            <UIcon name="i-heroicons-trash" class="float-right hover:bg-red-500"
              @click="attendanceStore?.deleteAttendance(attendance.code)" />
            <div @click="selectAttendance(attendance)">
              <h2 class="text-xl font-bold">{{ attendance?.code }}</h2>
              <p class="text-sm">{{ attendance?.date }}</p>
            </div>
          </UCard>
        </div>
      </div>
      <div class="flex justify-center mt-auto mb-4">
        <AttendanceCreateAttendance />
      </div>

    </UCard>
  </div>
</template>
<style></style>
