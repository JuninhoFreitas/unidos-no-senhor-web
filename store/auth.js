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
    const response = await fetch(`${config.public.baseUrl}/auth/me`, {
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
        roles.value = [data.role.id];
        return data;
      case 204:
        return [];
      case 401:
        await refreshToken();
        break;
      default:
        break;
    }
  }

  async function login({ email, password }) {
    const { data, pending, error } = await useFetch(`${config.public.baseUrl}/auth/email/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: email,
        password,
      },
    });
    loading.value = pending;

    if (data.value) {
      const token = useCookie('token', {
        maxAge: 60 * 15, // 15 minutes
      }); // useCookie new hook in nuxt 3
      token.value = data?.value?.token; // set token to cookie
      const refreshToken = useCookie('refreshToken', {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      refreshToken.value = data?.value?.refreshToken; // set refresh token to cookie

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

  async function refreshToken() {
    console.log('[refreshToken]: trying to refresh token using refresh token', useCookie('refreshToken').value);
    const { data, pending, error } = await useFetch(`${config.public.baseUrl}/auth/refresh`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${useCookie('refreshToken').value}` },
    });
    console.log('[refreshToken]: token refreshed', data.value);
    if (data.value) {
      console.log('[refreshToken]: token refreshed', data.value);
      const token = useCookie('token', {
        maxAge: 60 * 1, // 15 minutes
      }); // useCookie new hook in nuxt 3
      token.value = data?.value?.token; // set token to cookie
      console.log('[refreshToken]: token refreshed', token.value);
    }
    if (error.value) {
      console.log('[refreshToken]: error', error);
    }
    if (!error.value) {
      await getRoles();
    }
  }

  function logout() {
    const token = useCookie('token'); // useCookie new hook in nuxt 3
    token.value = null; // set token to cookie
    authenticated.value = false; // set authenticated  state value to true
  }

  const close = () => {
    show_login_window.value = false;
    location.reload();
  };

  return { login, show_login_window, authenticated, user, close, wrong_credentials, loading, logout, getRoles, roles, refreshToken };
});
