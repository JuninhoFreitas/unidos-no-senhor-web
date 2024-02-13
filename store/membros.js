import { defineStore } from 'pinia';

export const useMyMembrosStore = defineStore('membros', () => {
  const config = useRuntimeConfig();
  const membros = ref([]);

  const createMembro = async (membro) => {
    const response = await fetch(`${config.public.baseUrl}/membro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: membro,
    });
    return response;
  };

  const listMembros = async () => {
    const response = await fetch(`${config.public.baseUrl}/membro`);
    membros.value = await response.json();
  };

  const deleteMembro = async (id) => {
    await fetch(`${config.public.baseUrl}/membro/${id}`, {
      method: 'DELETE',
    });
    const nonDeleteMembers = membros.value.filter((membro) => membro.id !== id);
    membros.value = nonDeleteMembers;
  };

  return { membros, createMembro, listMembros, deleteMembro };
});
