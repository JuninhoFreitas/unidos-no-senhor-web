import { useMyAuthStore } from '../store/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  console.log('middleware/auth.ts: to', to);
  const store = useMyAuthStore();
  const { authenticated, roles } = storeToRefs(store); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies
  if(!token.value){
    await store.refreshToken();
    if (!token.value) {
      store.logout(); // clear the state
    }
  }
  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  if (to.meta.isProtected && authenticated.value) {
    await store.getRoles();
    if (to.meta.roles && !to.meta.roles.some((role: string) => roles.value.includes(role))) {
      return navigateTo('/');
    }
  }

  // Verify if actual route is protected and user has the right role
  // if not, redirect to homepage
  // the roles received from the server are in the format of an array of strings
  // so we need to check if the user has at least one of the roles
  // to.meta.roles is an array of strings with the roles that can access the route

  // if token exists and url is /login redirect to homepage
  if (to.meta.isProtected && token.value && to?.name === 'login') {
    await store.refreshToken();
    return navigateTo('/');
  }

  // if token doesn't exist redirect to log in
  if (to.meta.isProtected && !token.value && to?.name !== 'login') {
    // try to refresh token
    await store.refreshToken();
    if (!token.value) {
      store.logout(); // clear the state
      abortNavigation();
      return navigateTo('/');
    }
  }
});
