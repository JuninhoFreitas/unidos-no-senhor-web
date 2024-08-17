import { defineStore } from 'pinia';

export const useMemberStore = defineStore('members', () => {
  const config = useRuntimeConfig();
  const members = ref([]);

  const createMember = async (membro) => {
    const response = await fetch(`${config.public.baseUrl}/members`, {
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
    const response = await fetch(`${config.public.baseUrl}/members?limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
    });
    const { data } = await response.json();
    members.value = data;
  };

  const deleteMember = async (id) => {
    await fetch(`${config.public.baseUrl}/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedMembers = members.value.filter((membro) => membro.id !== id);
    members.value = nonDeletedMembers;
  };

  const updateMember = async (membro) => {
    const { id, ...updateBody } = membro;
    const json = JSON.stringify(updateBody);
    console.log('MEMBRO ', membro)
    return await fetch(`${config.public.baseUrl}/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
      body: json,
    });
  };

  return { members, createMember, listMembers, deleteMember, updateMember };
});
