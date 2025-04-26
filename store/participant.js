import { defineStore } from 'pinia';

export const useParticipantStore = defineStore('participant', () => {
  const config = useRuntimeConfig();
  const allowedParticipants = ref([]);
  const existingParticipants = ref([]);
  const createParticipant = async ({nome}) => {
    const body = {
      nome
    };
    try {
      const response = await fetch(`${config.public.baseUrl}/attendances/participants`, {
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
      console.error('Error creating participant:', error);
      return null;
    }
  };
  const allowParticipantsInEvent = async ({evento, participantes}) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/event-participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify({evento, participantes}),
    });
    const json = await response.json();
    return json;
  };

  const listParticipants = async () => {
    const response = await fetch(`${config.public.baseUrl}/attendances/participants?page=1&limit=500&offset=0`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    existingParticipants.value = json.data;
    return existingParticipants.value;
  };

  const listAllowedParticipants = async ({eventId}) => {
    const response = await fetch(`${config.public.baseUrl}/attendances/event-participants?evento_id=${eventId}&page=1&limit=500&offset=0`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const json = await response.json();
    allowedParticipants.value = json;
    console.log('listAllowedParticipants allowedParticipants.value', allowedParticipants.value);
    return allowedParticipants.value;
  };

  return {
    createParticipant,
    listParticipants,
    listAllowedParticipants,
    allowParticipantsInEvent,
    existingParticipants,
    allowedParticipants
  };
});
