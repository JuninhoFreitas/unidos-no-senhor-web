import { defineStore } from 'pinia';

export const useLibraryStore = defineStore('biblioteca', () => {
  const config = useRuntimeConfig();
  const createBook = async (body) => {
    const response = await fetch(`${config.public.baseUrl}/biblioteca`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  };
  return { createBook };
});
