import { defineStore } from 'pinia';

export const useOpenedStore = defineStore('opened', () => {
  // Create a ref to store the opened tabs, windows, and dialogs
  const opened = reactive({
    dialogs: {
      updatedMember: false,
      updatedBook: false,
    },
    windows: {
      addBook: false,
      addMember: false,
      addEvent: false,
      listEvents: true,
      checklist: false,
    },
  });

  return { opened };
});
