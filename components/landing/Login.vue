<script setup>
import { ref } from 'vue';
import { useMyAuthStore } from '~/store/auth';

const email = ref('');
const password = ref('');

const storeAuth = useMyAuthStore();
const { wrong_credentials } = storeToRefs(storeAuth);

async function submit() {
  const payload = {
    email: email.value,
    password: password.value,
  };
  await storeAuth.login(payload);
  if (!wrong_credentials){
    storeAuth.close();
  }
}
</script>
<template>
  <div class="bg-white p-8 rounded-lg shadow-lg" @keyup.esc="storeAuth.close">
    <h2 class="text-2xl font-bold text-center">Login</h2>
    <form class="mt-4">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          class="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          class="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
          @keyup.enter="submit"
        />
      </div>
      <div class="flex justify-center">
        <button
          @click="submit"
          type="button"
          class="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-black hover:border-black border-2"
        >
          Entrar
        </button>
      </div>
    </form>
    <UAlert
      v-if="wrong_credentials"
      icon="i-heroicons-command-line"
      color="red"
      variant="outline"
      title="Tente novamente..."
      description="Informações de Login incorretas"
      type="error"
      class="mt-4"
    />
    <div class="mt-4 flex justify-center">
      <button @click="storeAuth.close" class="text-blue-500 hover:text-blue-700">Fechar</button>
    </div>
  </div>
</template>
