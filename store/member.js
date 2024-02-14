import { defineStore } from 'pinia';

export const useMemberStore = defineStore('members', () => {
  const config = useRuntimeConfig();
  const members = ref([]);

  const createMember = async (membro) => {
    const response = await fetch(`${config.public.baseUrl}/membro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
      body: membro,
    });
    return response;
  };

  const listMembers = async () => {
    const response = await fetch(`${config.public.baseUrl}/membro`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
    });
    members.value = await response.json();
  };

  const deleteMember = async (id) => {
    await fetch(`${config.public.baseUrl}/membro/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedMembers = members.value.filter((membro) => membro.id !== id);
    members.value = nonDeletedMembers;
  };

  return { members, createMember, listMembers, deleteMember };
});
