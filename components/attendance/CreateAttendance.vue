<script lang="ts" setup>
import type { FormError } from '#ui/types';
import { useEventsStore } from '@/store/events';
import { useAttendanceStore } from '@/store/attendance';
import { reloadNuxtApp } from 'nuxt/app';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const eventsStore = useEventsStore();
const attendanceStore = useAttendanceStore();
const { selectedEvent } = storeToRefs(eventsStore);
const attendanceState = reactive({
  evento: selectedEvent.value.id,
  participante: [],
  date: '',
  code: '',
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.code) errors.push({ path: 'code', message: 'É necessário o código da lista de presença' });
  return errors;
};

function formatCode(code: string) {
  return code.toUpperCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

async function createAttendance() {
  attendanceState.code = formatCode(attendanceState.code);
  try {
    const response = await attendanceStore.createAttendance({
      evento: attendanceState.evento,
      participante: attendanceState.participante,
      date: formattedDate.value,
      code: attendanceState.code,
    });
    
    if (response) {
      console.log('Attendance created successfully:', response);
      await attendanceStore.listAttendancesByEvent(selectedEvent.value.id);
      opened.value.windows.addEvent = false;
    }

  } catch (error) {
    console.error('Error creating attendance:', error);
  }
}

const openCreateEvent = () => {
  opened.value.windows.addEvent = true;
};

const rawDate = ref(null);
const formattedDate = computed(() => {
  if (rawDate.value) {
    const date = new Date(rawDate.value);
    return date.toISOString();
  }
  return new Date().toISOString();
});
</script>

<template>
  <div>
    <!-- Crie um botão com um simbolo de +
    que ao clicar, deve abrir um modal com um campo de texto para o nome do evento e um campo de texto para a descrição do evento e um campo de data
    -->
    <UButton class="text-4xl p-0 pb-2 px-2" label="+" @click="openCreateEvent" />
    <UModal v-model="opened.windows.addEvent">
      <div class="flex flex-col gap-4 m-5">
        <UForm :validate="validate" :state="attendanceState" class="space-y-4" @submit="createAttendance">
          <UFormGroup label="Código da Lista de Presença" name="code">
            <UInput v-model="attendanceState.code" />
          </UFormGroup>

          <UFormGroup label="Data" name="data">
            <!-- Format the date to DD/MM/YYYY -->
            <UInput v-model="formattedDate" type="date" />
          </UFormGroup>

          <UButton type="submit" @click="createAttendance"> Criar </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<style></style>
