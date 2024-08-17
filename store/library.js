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
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  };

  const listBooks = async () => {
    const response = await fetch(`${config.public.baseUrl}/libraries`);
    const { data } = await response.json();
    books.value = data;
    return books.value;
  };

  const getBook = async (id) => {
    const response = await fetch(`${config.public.baseUrl}/libraries/${id}`);
    return await response.json();
  };

  const updateBook = async (body) => {
    body.anoDeImpressao = body.anoDeImpressao.toString();
    const { id, ...request } = body;
    const response = await fetch(`${config.public.baseUrl}/libraries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      body: JSON.stringify(request),
    });
    return response;
  };

  const deleteBook = async (id) => {
    await fetch(`${config.public.baseUrl}/libraries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const nonDeletedBooks = books.value.filter((book) => book.id !== id);
    books.value = nonDeletedBooks;
  };

  return { createBook, listBooks, deleteBook, updateBook, getBook, books };
});
