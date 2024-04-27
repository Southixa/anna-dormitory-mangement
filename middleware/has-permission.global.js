export default defineNuxtRouteMiddleware((_to, from) => {
  const token = useCookie("token");
    if(_to.name == "login") {
      token.value = "";
      return;
    }
    if(!token.value) {
      return navigateTo("/login");
    }
  });
  