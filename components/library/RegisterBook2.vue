<script setup lang="ts">
const props = defineProps(['bookToUpdate', 'action']);
import type { FormSubmitEvent } from '#ui/types';
import { useLibraryStore } from '~/store/library';
import { useOpenedStore } from '~/store/openeds';
const store = useLibraryStore();
const openedStore = useOpenedStore();
const { opened } = storeToRefs(openedStore);

const isOpen = ref(false);
const success = ref(false);
const mensagem_sucesso = ref('Livro atualizado com sucesso!');
const mensagem_erro = ref('');

const { createBook, listBooks, updateBook } = store;

let state = reactive({
  titulo: undefined,
  autor: undefined,
  editora: undefined,
  isbn: undefined,
  anoDeImpressao: undefined,
  observacao: undefined,
  reservado: false,
});

// TODO: Criar Enum para Colocar as Actions: UPDATE e CREATE
if (props.action == 'update') {
  console.log('props', props.bookToUpdate);
  state = {
    ...props.bookToUpdate,
  };
}
const reservado = ref(props?.bookToUpdate?.reservado || false);

const hand = ref(opened.value.dialogs.updatedBook);
const opts = [
  { name: 'titulo', placeholder: 'Título', type: 'text' },
  { name: 'autor', placeholder: 'Autor', type: 'text' },
  { name: 'editora', placeholder: 'Editora', type: 'text' },
  { name: 'isbn', placeholder: 'ISBN', type: 'text' },
  { name: 'anoDeImpressao', placeholder: 'Ano de Impressão', type: 'number' },
  { name: 'observacao', placeholder: 'Observação', type: 'text' },
  // { name: 'reservado', placeholder: 'Reservado', type: 'checkbox' },
];
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [hand],
    handler: () => {
      opened.value.dialogs.updatedBook = false;
    },
  },
});

watch(success, (value) => {
  opened.value.dialogs.updatedBook = value;
});

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  const payload = event.data;
  payload.reservado = reservado.value;
  const form = document.getElementById('form');
  if (props.action == 'update') {
    const resUpdate = await updateBook(payload);
    if (resUpdate.status === 200) {
      success.value = true;
      listBooks();
    } else {
      resUpdate.json().then((data) => {
        mensagem_erro.value = data.message;
        isOpen.value = true;
      });
    }
    return;
  }
  createBook(payload).then((response) => {
    if (response.status === 201) {
      form.reset();
      listBooks();
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
          <div @focusout="opened.dialogs.updatedBook = false" class="p-4 flex justify-center text-red-400 text-1xl my-5">
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
        >
          <UFormGroup v-for="opt in opts" :label="opt.placeholder" :name="opt.name">
            <UInput v-model="state[opt.name]" :placeholder="opt.placeholder" :type="opt.type" />
          </UFormGroup>
          <UFormGroup label="Reservado?" name="reservado">
            <UToggle v-model="reservado" variant="outline" name="reservado" />
          </UFormGroup>
          <UButton type="submit" size="lg" class="bg-black text-white hover:bg-slate-900 border-2 border-transparent" block>{{
            props.action == 'update' ? 'Atualizar Livro' : 'Cadastrar Livro'
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
