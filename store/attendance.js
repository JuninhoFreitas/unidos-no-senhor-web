import { defineStore } from 'pinia';

export const useAttendanceStore = defineStore('attendance', () => {
  const config = useRuntimeConfig();
  const attendances = ref([]);
  const participants = ref([]);
  const selectedParticipants = ref([]);

  const createAttendance = async (participante_id, evento_id) => {
    console.log({
      participante_id,
      evento_id,
    });
    const body = {
      evento_id,
      participante_id,
    };
    const response = await fetch(`${config.public.baseUrl}/lista-de-presenca`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  };

  const listAttendance = async (query) => {
    const response = await fetch(`${config.public.baseUrl}/lista-de-presenca?${query}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    attendances.value = await response.json();
    return attendances.value;
  };

  const deleteAttendance = async (id) => {
    await fetch(`${config.public.baseUrl}/lista-de-presenca/deletar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedAttendances = attendances.value.filter((attendance) => attendance.id !== id);
    attendances.value = nonDeletedAttendances;
  };

  const createParticipant = async (body) => {
    const response = await fetch(`${config.public.baseUrl}/lista-de-presenca/participantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  };

  const updateParticipant = async (body) => {
    const { id, ...request } = body;
    const response = await fetch(`${config.public.baseUrl}/lista-de-presenca/participantes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(request),
    });
    return response;
  };

  const listParticipants = async (query = '') => {
    const response = await fetch(`${config.public.baseUrl}/lista-de-presenca/participantes?${query}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    participants.value = await response.json();
    return participants.value;
  };

  const listAllChecked = async (evento_id) => {
    const response = await fetch(`${config.public.baseUrl}/lista-de-presenca/?evento_id=${evento_id}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    console.log('Ue', json);

    selectedParticipants.value = json.map((at) => {
      const name = participants.value.find((p) => p.id === at.participante_id).nome;
      return {
        id: at.participante_id,
        name,
      };
    });
    return selectedParticipants.value;
  };

  return {
    createAttendance,
    listAttendance,
    deleteAttendance,
    updateParticipant,
    createParticipant,
    listParticipants,
    listAllChecked,
    attendances,
    participants,
    selectedParticipants,
  };
});
