import { defineStore } from 'pinia';

export const useMyAuthStore = defineStore('myAuthStore', () => {
  const config = useRuntimeConfig();
  const authenticated = ref(false);
  const loading = ref(false);
  const show_login_window = ref(false);
  const wrong_credentials = ref(false);
  const user = ref(null);
  const roles = ref([]);

  async function getRoles() {
    const response = await fetch(`${config.public.baseUrl}/token/roles`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
    });
    const status = response.status;
    switch (status) {
      case 200:
        const data = await response.json();
        roles.value = data;
        return data;
      case 204:
        return [];
      default:
        break;
    }
  }

  async function login({ email, password }) {
    const { data, pending, error } = await useFetch(`${config.public.baseUrl}/usuario/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: {
        username: email,
        password,
      },
    });
    loading.value = pending;

    if (data.value) {
      const token = useCookie('token', {
        maxAge: 60 * 60 * 24, // 1 day
      }); // useCookie new hook in nuxt 3
      token.value = data?.value?.access_token; // set token to cookie
      this.authenticated = true; // set authenticated  state value to true
      wrong_credentials.value = false;
      await getRoles();
    }
    if (error.value) {
      console.log('Email ou senha inválidos', error);
      wrong_credentials.value = true;
    }
    console.log('wrong', wrong_credentials.value);
    if (!wrong_credentials.value) close();
  }

  function logout() {
    const token = useCookie('token'); // useCookie new hook in nuxt 3
    token.value = null; // set token to cookie
    authenticated.value = false; // set authenticated  state value to true
  }

  const close = () => {
    show_login_window.value = false;
  };

  return { login, show_login_window, authenticated, user, close, wrong_credentials, loading, logout, getRoles, roles };
});
