export default defineNuxtRouteMiddleware((_to, from) => {
    const token = useCookie("token");
    if(_to.name == "login") {
      return;
    }
    if(!token.value) {
      return navigateTo("/login");
    }
  });
  