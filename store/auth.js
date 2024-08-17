import { defineStore } from 'pinia';

export const useMyAuthStore = defineStore('myAuthStore', ()=>{
  const config = useRuntimeConfig();
  const authenticated = ref(false)
  const loading = ref(false);
  const show_login_window = ref(false)
  const wrong_credentials = ref(false)
  const user = ref(null)
  const roles = ref([])

  async function getRoles() {
    //get roles from cookie
    const rolesCookie = useCookie('roles');
    roles.value = rolesCookie.value || [];
    return roles.value;
  }

  async function setRoles(role){
    const rolesCookie = useCookie('roles');
    rolesCookie.value = role;
    roles.value = rolesCookie.value || [];
  }

  async function login ({ email, password }){
    const { data, pending, error } = await useFetch(`${config.public.baseUrl}/auth/email/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: {
        email,
        password,
      },
    });
    loading.value = pending;

    if (data.value) {
      const token = useCookie('token', {
        maxAge: 60 * 60 * 24, // 1 day
      }); // useCookie new hook in nuxt 3
      token.value = data?.value?.token; // set token to cookie
      this.authenticated = true; // set authenticated  state value to true
      await setRoles(data?.value?.user?.role?.name);
    }
    if(error) {
      console.log('Email ou senha inválidos');
      wrong_credentials.value = true;
    }
    close();
  };

  function logout() {
    const token = useCookie('token');
    token.value = null;
    authenticated.value = false;
    roles.value = [];
  }

  const close = () => {
    show_login_window.value = false;
  };

  return { login, show_login_window, authenticated, user, close, wrong_credentials, loading, logout, getRoles, roles }
})
