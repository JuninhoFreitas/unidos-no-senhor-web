<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useEventsStore } from '@/store/events';
import { reloadNuxtApp } from 'nuxt/app';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const eventsStore = useEventsStore();
const { opened } = storeToRefs(openedStore);
const eventState = reactive({
  nome: '',
  descricao: '',
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.nome) errors.push({ path: 'nome', message: 'É necessário o nome do evento' });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  await eventsStore.createEvent({
    nome: eventState.nome,
    descricao: eventState.descricao
  });
  reloadNuxtApp({
    path: '/listaDePresenca',
    ttl: 5000, // default 10000
  });
}

const openCreateEvent = () => { 
  opened.value.windows.addEvent = true;
};

</script>

<template>
  <div>
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

          <UButton type="submit"> Cadastrar Evento </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<style></style>
