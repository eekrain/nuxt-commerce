import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const { accessToken } = useAuth();
  if (accessToken.value) return navigateTo("/");
});
