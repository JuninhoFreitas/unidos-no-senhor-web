<script setup>
import { useMyAuthStore } from '~/store/auth';
const menuitems = [
  {
    title: 'Pagina Inicial',
    path: '/',
  },
  {
    title: 'Biblioteca',
    path: '/biblioteca',
  },
  {
    title: 'Membros',
    path: '/membros',
  },
  {
    title: 'Sobre',
    path: '/sobre',
  },
];

const open = ref(false);

const authStore = useMyAuthStore();
const { show_login_window, authenticated } = storeToRefs(authStore);
authenticated.value = useCookie('token').value ? true : false;

if (authenticated.value) {
  menuitems.push({
    title: 'Lista de Presença',
    path: '/listaDePresenca',
  });
}

const openLogin = () => {
  show_login_window.value = true;
};

function logoutAndRefresh() {
  authStore.logout();
  location.reload();
}
</script>

<template>
  <LandingContainer>
    <header class="flex flex-col lg:flex-row justify-between items-center my-5">
      <div class="flex w-full lg:w-auto items-center justify-between">
        <a href="/" class="text-lg"
          ><span class="font-bold text-green-600">Unidos </span><span class="text-slate-500">no </span>
          <span class="font-bold text-blue-950">Senhor</span>
        </a>
        <div class="block lg:hidden">
          <button @click="open = !open" class="text-gray-800">
            <svg fill="currentColor" class="w-4 h-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path
                v-show="open"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
              ></path>
              <path
                v-show="!open"
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <nav class="w-full lg:w-auto mt-2 lg:flex lg:mt-0" :class="{ block: open, hidden: !open }">
        <ul class="flex flex-col lg:flex-row lg:gap-3">
          <li v-for="item of menuitems">
            <a :href="item.path" class="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900">
              {{ item.title }}
            </a>
          </li>
        </ul>
        <div class="lg:hidden flex items-center mt-3 gap-4">
          <!-- <LandingLink href="#" styleName="muted" block size="md">Log in</LandingLink> -->
          <div v-if="!authenticated" class="lg:flex items-center gap-4">
            <!-- When click log in, must render <LandingLogin/> -->
            <LandingLink @click="openLogin" href="#" block size="md">Log in</LandingLink>
            <!-- Button to logout -->
          </div>
          <!-- Hide this div if  "is_authenticated" is false -->
          <LandingLink v-else-if="authenticated" @click="logoutAndRefresh" href="#" size="md">Log out</LandingLink>
        </div>
      </nav>
      <div>
        <!-- Hide this div if  "is_authenticated" is true -->
        <div v-if="!authenticated" class="hidden lg:flex items-center gap-4">
          <!-- When click log in, must render <LandingLogin/> -->
          <LandingLink @click="openLogin" href="#" size="md">Log in</LandingLink>
          <!-- Button to logout -->
        </div>
        <!-- Hide this div if  "is_authenticated" is false -->
        <LandingLink v-else-if="authenticated" @click="logoutAndRefresh" href="#" size="md" class="hidden lg:flex">Log out</LandingLink>
      </div>
    </header>
  </LandingContainer>
</template>
