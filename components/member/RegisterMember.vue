<script setup lang="ts">
const props = defineProps(['memberToUpdate', 'action', 'closeFunction']);
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useMemberStore } from '~/store/member';
import { useOpenedStore } from '~/store/openeds';
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);

//Create a function to validate if the user inserted a date in dd/mm/yyyy format

const validateDate = (date) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(date);
};

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Required' });
  if (!state.nome) errors.push({ path: 'nome', message: 'Required' });
  if (state.dataNascimento && !validateDate(state.dataNascimento))
    errors.push({ path: 'dataNascimento', message: 'Formato de data inválido, exemplo: 31/12/2024' });
  if (state.dataBatismo && !validateDate(state.dataNascimento))
    errors.push({ path: 'dataBatismo', message: 'Formato de data inválido, exemplo: 31/12/2024' });
  if (state.dataEntrada && !validateDate(state.dataEntrada))
    errors.push({ path: 'dataEntrada', message: 'Formato de data inválido, exemplo: 31/12/2024' });
  if (state.dataSaida && !validateDate(state.dataSaida))
    errors.push({ path: 'dataSaida', message: 'Formato de data inválido, exemplo: 31/12/2024' });
  return errors;
};

const isOpen = ref(false);
const success = ref(false);
const mensagem_sucesso = ref('Membro atualizado com sucesso!');
const mensagem_erro = ref('');
const store = useMemberStore();
const { createMember, listMembers, updateMember } = store;

let state = reactive({
  nome: undefined,
  email: undefined,
  telefone: undefined,
  dataNascimento: undefined,
  dataBatismo: undefined,
  cargo: undefined,
  endereco: undefined,
  bairro: undefined,
  cidade: undefined,
  cep: undefined,
  conjuge: undefined,
  dataEntrada: undefined,
  dataSaida: undefined,
  situacao: undefined,
  observacao: undefined,
});

// TODO: Criar Enum para Colocar as Actions: UPDATE e CREATE
if (props.action == 'update') {
  console.log('props', props.memberToUpdate);
  state = {
    ...props.memberToUpdate,
  };
}
const countries = ['Ativo', 'Inativo'];
const hand = ref(opened.value.dialogs.updatedMember);
const opts = [
  { name: 'nome', placeholder: 'Nome', type: 'text' },
  // { name: 'cpf', placeholder: 'CPF', type: 'text' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'telefone', placeholder: 'Telefone', type: 'text' },
  { name: 'dataNascimento', placeholder: 'Data de Nascimento', type: 'text' },
  { name: 'dataBatismo', placeholder: 'Data de Batismo', type: 'text' },
  { name: 'cargo', placeholder: 'Cargo', type: 'text' },
  { name: 'endereco', placeholder: 'Endereço', type: 'text' },
  { name: 'bairro', placeholder: 'Bairro', type: 'text' },
  { name: 'cidade', placeholder: 'Cidade', type: 'text' },
  { name: 'cep', placeholder: 'CEP', type: 'text' },
  { name: 'conjuge', placeholder: 'Cônjuge', type: 'text' },
  { name: 'dataEntrada', placeholder: 'Data de Entrada', type: 'text' },
  { name: 'dataSaida', placeholder: 'Data de Saída', type: 'text' },
  // { name: 'situacao', placeholder: 'Situação', type: 'text' },
  { name: 'observacao', placeholder: 'Observação', type: 'text' },
];
const country = ref([]);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [hand],
    handler: () => {
      opened.value.dialogs.updatedMember = false;
    },
  },
});

watch(success, (value) => {
  opened.value.dialogs.updatedMember = value;
});

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  const payload = event.data;
  const form = document.getElementById('form');
  const json = JSON.stringify(payload);
  console.log('json', json);
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
      form.reset();
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
<template>
  <LandingContainer>
    <div class="w-full border-5 justify-center mx-auto border-green-100 sm:w-1/2 overflow-auto">
      <main>
        <UModal v-model="isOpen">
          <div @focusout="opened.dialogs.updatedMember = false" class="p-4 flex justify-center text-red-400 text-1xl my-5">
            {{ mensagem_erro }}
          </div>
        </UModal>
        <UModal v-model="success">
          <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <div class="p-4 flex justify-center text-green-400 text-2xl my-5">
              <h1>{{ mensagem_sucesso }}</h1>
            </div>
          </UCard>
        </UModal>

        <UForm
          class="w-full needs-validation grid grid-cols-2"
          :state="state"
          method="POST"
          id="form"
          @submit="onSubmit"
          :validate="validate"
        >
          <!-- <UInput v-for="opt in opts" :key="opt.name" :name="opt.name" :placeholder="opt.placeholder" :type="opt.type" required /> -->
          <!-- <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup> -->

          <UFormGroup v-for="opt in opts" :label="opt.placeholder" :name="opt.name">
            <UInput v-model="state[opt.name]" :placeholder="opt.placeholder" :type="opt.type" />
          </UFormGroup>
          <UFormGroup label="Situação" name="situacao">
            <USelect v-model="state.situacao" :options="countries" variant="outline" placeholder="Situação" name="situacao" />
          </UFormGroup>
          <UButton type="submit" size="lg" class="bg-black text-white hover:bg-slate-900 border-2 border-transparent" block>{{
            props.action == 'update' ? 'Atualizar Membro' : 'Cadastrar Membro'
          }}</UButton>
        </UForm>
        <div id="result" class="mt-3 text-center"></div>
      </main>
    </div>
  </LandingContainer>
</template>

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
