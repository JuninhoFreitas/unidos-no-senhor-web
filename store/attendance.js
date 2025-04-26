import { defineStore } from 'pinia';

export const useAttendanceStore = defineStore('attendance', () => {
  const config = useRuntimeConfig();
  const attendances = ref([]);
  const attendancesByEvent = ref([]);
  const participants = ref([]);
  const selectedParticipants = ref([]);
  const selectedAttendance = ref([]);
  const createAttendance = async ({participante, evento, code, date}) => {
    const body = {
      evento,
      participante,
      code,
      date,
    };
    try {
      const response = await fetch(`${config.public.baseUrl}/attendances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${useCookie('token').value}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.ok;
    } catch (error) {
      console.error('Error creating attendance:', error);
      return null;
    }
  };

  const listAttendancesByEvent = async (evento_id) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/unique-code`, {
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    const uniqueCode = json.filter((item) => item.evento === evento_id);
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

  const deleteAttendance = async (code) => {
    await fetch(`${config.public.baseUrl}/attendances/${code}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedAttendances = attendancesByEvent.value.filter((attendance) => attendance.code !== code);
    attendancesByEvent.value = nonDeletedAttendances;
  };

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

  const listAllChecked = async (code) => {
    const response = await fetch(`${config.public.baseUrl}/attendances?code=${code}`, {
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
      const participante = participants.value.find((p) => p.participante === at.participante);
      if(!participante?.nome){
        console.log('participante não encontrado', at);
      }

      return {
        participante: at.participante,
        name: participante?.nome,
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
    attendancesByEvent,
    selectedAttendance,
  };
});
