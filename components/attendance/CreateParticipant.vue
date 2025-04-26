<script lang="ts" setup>
import type { FormError } from '#ui/types';
import { useParticipantStore } from '@/store/participant';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);
const participantStore = useParticipantStore();
const createParticipantState = reactive({
    participante: ''
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.participante) errors.push({ path: 'participante', message: 'É necessário o nome do participante' });
  return errors;
};

async function createParticipant() {
  try {
    const response = await participantStore.createParticipant({
      nome: createParticipantState.participante,
    });
    
    if (response) {
      console.log('Participant created successfully:', response);
      opened.value.windows.createParticipant = false;
    }

  } catch (error) {
    console.error('Error creating participant:', error);
  }
}

const openCreateParticipant = () => {
  opened.value.windows.createParticipant = true;
};
</script>

<template>
  <div>
    <UButton class="text-4xl p-0 pb-2 px-2" label="Criar Participante" @click="openCreateParticipant" />
    <UModal v-model="opened.windows.createParticipant">
      <div class="flex flex-col gap-4 m-5">
        <UForm :validate="validate" :state="createParticipantState" class="space-y-4" @submit="createParticipant">
          <UFormGroup label="Nome do Participante" name="participante">
            <UInput v-model="createParticipantState.participante" />
          </UFormGroup>
          <UButton type="submit" @click="createParticipant"> Criar </UButton>
        </UForm>
      </div>
    </UModal>
  </div>
</template>

<style></style>
