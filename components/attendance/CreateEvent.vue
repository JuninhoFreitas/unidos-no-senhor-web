<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useEventsStore } from '@/store/events';
import { reloadNuxtApp } from 'nuxt/app';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const eventsStore = useEventsStore();
const eventState = reactive({
  nome: '',
  descricao: undefined,
  data: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.nome) errors.push({ path: 'nome', message: 'É necessário o nome do evento' });
  // if (!eventState.descricao) errors.push({ path: 'password', message: 'Required' })
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  await eventsStore.createEvent({
    nome: eventState.nome,
    descricao: eventState.descricao,
    data: formattedDate.value,
  });
  // Reload the page for the user using router
  reloadNuxtApp({
    path: '/listaDePresenca',
    ttl: 5000, // default 10000
  });
}

const openCreateEvent = () => {
  opened.value.windows.addEvent = true;
};

const rawDate = ref(null);
const formattedDate = computed(() => {
  if (rawDate.value) {
    const date = new Date(rawDate.value);
    return date.toLocaleDateString('pt-BR');
  }
  return new Date().toLocaleDateString('pt-BR');
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
        <UForm :validate="validate" :state="eventState" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Nome" name="nome">
            <UInput v-model="eventState.nome" />
          </UFormGroup>

          <UFormGroup label="Descrição" name="descricao">
            <UInput v-model="eventState.descricao" type="text" />
          </UFormGroup>

          <UFormGroup label="Data" name="data">
            <!-- Format the date to DD/MM/YYYY -->
            <UInput v-model="formattedDate" type="date" />
          </UFormGroup>

          <UButton type="submit"> Submit </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<style></style>
