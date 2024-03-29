import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', () => {
  const config = useRuntimeConfig();
  const events = ref([]);
  const selectedEvent = ref(null);

  const createEvent = async (body) => {
    console.log(body, 'body');
    const response = await fetch(`${config.public.baseUrl}/eventos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  };

  const listEvents = async () => {
    const response = await fetch(`${config.public.baseUrl}/eventos`);
    const json = await response.json();
    console.log(json);
    events.value = json;
    return events.value;
  };

  const updateEvent = async (body) => {
    const { id, ...request } = body;
    const response = await fetch(`${config.public.baseUrl}/eventos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(request),
    });
    return response;
  };

  const deleteEvent = async (id) => {
    await fetch(`${config.public.baseUrl}/eventos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedBooks = events.value.filter((book) => book.id !== id);
    events.value = nonDeletedBooks;
  };

  return { createEvent, listEvents, deleteEvent, updateEvent, events, selectedEvent };
});
