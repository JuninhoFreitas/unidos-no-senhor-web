import { defineStore } from 'pinia';

export const useAttendanceStore = defineStore('attendance', () => {
  const config = useRuntimeConfig();
  const attendances = ref([]);
  const participants = ref([]);
  const selectedParticipants = ref([]);

  const createAttendance = async (participante, evento) => {
    console.log({
      participante,
      evento,
    });
    const body = {
      evento,
      participante,
    };
    const response = await fetch(`${config.public.baseUrl}/attendances`, {
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
    const response = await fetch(`${config.public.baseUrl}/attendances?${query}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    attendances.value = await response.json();
    return attendances.value;
  };

  const deleteAttendance = async (id) => {
    await fetch(`${config.public.baseUrl}/attendances/deletar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedAttendances = attendances.value.filter((attendance) => attendance.id !== id);
    attendances.value = nonDeletedAttendances;
  };

  //NOT USED
  const createParticipant = async (body) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  };

  //NOT USED
  const updateParticipant = async (body) => {
    const { id, ...request } = body;
    const response = await fetch(`${config.public.baseUrl}/attendances/participants/${id}`, {
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
    const response = await fetch(`${config.public.baseUrl}/attendances/participants?limit=1000${query ? `&${query}` : ''}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },  
    });
    const { data } = await response.json();
    participants.value = data;
    return participants.value;
  };

  const listAllChecked = async (evento_id) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/?evento=${evento_id}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const { data } = await response.json();
    console.log('Ue', data);

    selectedParticipants.value = data.map((at) => {
      const name = participants.value.find((p) => p.id === at.participante).nome;
      return {
        id: at.participante,
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
