<!-- #Create a Login Window 
  - The window should have a form with two inputs: email and password
  - The window should have a button to submit the form
    - the style of the button must be a glass with black border and blur background, black font color and white font color when hove
  - The window should have a button to close the window
  - The request to the server should be made using the axios API
  - Here is an example of response:
  {
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyaXpvbGxhanJAZ21haWwuY29tIiwic3ViIjoyLCJpYXQiOjE3MDc3MTQ2NjUsImV4cCI6MTcwNzcxNDcyNX0._0-o9yixglHIxci8QZG0s217iHr-UDGEIz3L0O1lKJM"
  }
  - The request should be made to the following endpoint: config.public.baseUrl + '/login'
  - The request should be a POST request
  - The request should have the following body:
  {
    "email": "
    "password": "
  }

  - the access_token should be stored in the localStorage with the key "token"
  - The window should be closed when the user clicks the submit button
};
  - The request should be made when the user clicks the submit button
-->
<script setup>
import { ref } from 'vue';
import { useMyAuthStore } from '~/store/auth';
const email = ref('');
const password = ref('');

const storeAuth = useMyAuthStore();
const { wrong_credentials } = storeToRefs(storeAuth);


async function submit(){
  const payload = {
    email: email.value,
    password: password.value
  }
  console.log('payload', payload)
  await storeAuth.login(payload);
  close();
}

</script>
<template>
  <div class="bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold text-center">Login</h2>
    <form class="mt-4">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input v-model="email" type="email" id="email" name="email" class="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
        <input v-model="password" type="password" id="password" name="password" class="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500" />
      </div>
      <div class="flex justify-center">
        <button @click="submit" type="button" class="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-white hover:text-black hover:border-black border-2">Entrar</button>
      </div>
    </form>
    <div class="mt-4 flex justify-center">
      <button @click="storeAuth.close" class="text-blue-500 hover:text-blue-700">Fechar</button>
    </div>
  </div>
</template>