import { defineStore } from 'pinia';

export const useLibraryStore = defineStore('biblioteca', () => {
  const config = useRuntimeConfig();
  const books = ref([]);
  const createBook = async (body) => {
    body.anoDeImpressao = body.anoDeImpressao.toString();
    const response = await fetch(`${config.public.baseUrl}/libraries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json.data;
  };

  const listBooks = async () => {
    const response = await fetch(`${config.public.baseUrl}/libraries`);
    const json = await response.json();
    books.value = json.data;
    return books.value;
  };

  const updateBook = async (body) => {
    body.anoDeImpressao = body.anoDeImpressao.toString();
    const { id, ...request } = body;
    const response = await fetch(`${config.public.baseUrl}/libraries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(request),
    });
    const json = await response.json();
    return json.data;
  }

  const deleteBook = async (id) => {
    await fetch(`${config.public.baseUrl}/libraries/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedBooks = books.value.filter((book) => book.id !== id);
    books.value = nonDeletedBooks;
  }

  return { createBook, listBooks, deleteBook, updateBook, books };
});
