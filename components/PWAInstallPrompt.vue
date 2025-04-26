<template>
  <div v-if="showPrompt" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm" @click="cancelInstall"></div>
    <div class="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
      <h2 class="text-2xl font-bold text-center mb-4">Instalar Aplicativo</h2>
      <p class="text-gray-600 text-center mb-6">
        Instale nosso aplicativo para ter uma experiência melhor e acesso offline aos conteúdos.
      </p>
      <div class="flex justify-center gap-4">
        <button
          @click="install"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Instalar
        </button>
        <button
          @click="cancelInstall"
          class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showPrompt = ref(false);
const visitCount = ref(0);
const deferredPrompt = ref(null);

onMounted(() => {
  // Get visit count from localStorage
  const storedCount = localStorage.getItem('pwaVisitCount');
  visitCount.value = storedCount ? parseInt(storedCount) : 0;
  
  // Increment visit count
  visitCount.value++;
  localStorage.setItem('pwaVisitCount', visitCount.value.toString());

  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt.value = e;
    
    // Show prompt only in first 3 visits
    if (visitCount.value <= 3) {
      showPrompt.value = true;
    }
  });
});

const install = async () => {
  if (deferredPrompt.value) {
    // Show the install prompt
    deferredPrompt.value.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.value.userChoice;
    
    // Clear the deferredPrompt
    deferredPrompt.value = null;
    
    // Hide the install prompt
    showPrompt.value = false;
  }
};

const cancelInstall = () => {
  showPrompt.value = false;
};
</script> 