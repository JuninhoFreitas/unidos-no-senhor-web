import { defineStore } from 'pinia';

export const useAttendanceStore = defineStore('attendance', () => {
  const config = useRuntimeConfig();
  const attendances = ref([]);
  const attendancesByEvent = ref([]);
  const participants = ref([]);
  const selectedParticipants = ref([]);

  const createAttendance = async (participante_id, evento_id) => {
    console.log({
      participante_id,
      evento_id,
    });
    const body = {
      evento: evento_id,
      participante: participante_id,
    };
    const response = await fetch(`${config.public.baseUrl}/attendances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response.json().data;
  };

  const listAttendancesByEvent = async (evento_id) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/unique-code`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    const data = json.data;
    const uniqueCode = data.filter((item) => item.evento === evento_id);
    attendancesByEvent.value = uniqueCode;
    console.log('[attendancesByEvent] filtered', attendancesByEvent.value);
    return attendancesByEvent.value;

  };

  const listAttendance = async (query) => {
    const response = await fetch(`${config.public.baseUrl}/attendances?${query}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    attendances.value = await response.json().data;
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

  const createParticipant = async (body) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/participantes`, {
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
    const response = await fetch(`${config.public.baseUrl}/attendances/participantes/${id}`, {
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
    const response = await fetch(`${config.public.baseUrl}/attendances/participants?page=1&limit=500&offset=0`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    const data = json.data; 
    participants.value = data;
    return participants.value;
  };

  const listAllChecked = async (evento_id) => {
    const response = await fetch(`${config.public.baseUrl}/attendances?evento=${evento_id}`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    const data = json.data;
    console.log('Ue', data);

    selectedParticipants.value = data.map((at) => {
      console.log('at', at);
      console.log('participants', participants.value);
      const name = participants.value.find((p) => p.membro_id === at.participante).nome;
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
    listAttendancesByEvent,
  };
});
