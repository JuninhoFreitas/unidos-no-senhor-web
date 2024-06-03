<template>
  <div class="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <UForm
      class="w-full needs-validation grid grid-cols-1 gap-4"
      :state="state"
      method="POST"
      id="form"
      @submit="onSubmit"
      :validate="validate"
    >
      <UFormGroup label="Nome" name="nome">
        <UInput v-model="state.nome" placeholder="Nome" type="text" required />
      </UFormGroup>
      <UFormGroup label="Situação" name="situacao">
        <USelect v-model="state.situacao" :options="situacaoOptions" placeholder="Selecione a Situação" required />
      </UFormGroup>
      <UButton type="submit" size="lg" class="bg-black text-white hover:bg-slate-900 border-2 border-transparent" block>
        {{ props.action == 'update' ? 'Atualizar Membro' : 'Cadastrar Membro' }}
      </UButton>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useMemberStore } from '~/store/member';
import { useOpenedStore } from '~/store/openeds';

const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);

const props = defineProps({
  action: {
    type: String,
    required: true,
  },
});

const state = reactive({
  nome: '',
  situacao: '',
});

const situacaoOptions = [
  { label: 'Ativo', value: 'ativo' },
  { label: 'Inativo', value: 'inativo' },
];

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.nome) errors.push({ path: 'nome', message: 'Required' });
  if (!state.situacao) errors.push({ path: 'situacao', message: 'Required' });
  return errors;
};

const store = useMemberStore();
const { createMember, updateMember, listMembers } = store;

const success = ref(false);
const mensagem_erro = ref('');
const isOpen = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
  const payload = event.data;
  const form = document.getElementById('form');
  const json = JSON.stringify(payload);

  if (props.action == 'update') {
    const resUpdate = await updateMember(payload);
    if (resUpdate.status === 200) {
      success.value = true;
      listMembers();
    } else {
      resUpdate.json().then((data) => {
        mensagem_erro.value = data.message;
        isOpen.value = true;
      });
    }
    return;
  }

  createMember(json).then((response) => {
    if (response.status === 201) {
      form?.reset();
      listMembers();
    } else {
      response.json().then((data) => {
        mensagem_erro.value = data.message;
        isOpen.value = true;
      });
    }
  });
}
</script>

<style>
.invalid-feedback,
.empty-feedback {
  display: none;
}

.was-validated :placeholder-shown:invalid ~ .empty-feedback {
  display: block;
}

.was-validated :not(:placeholder-shown):invalid ~ .invalid-feedback {
  display: block;
}

.is-invalid,
.was-validated :invalid {
  border-color: #dc3545;
}
</style>
