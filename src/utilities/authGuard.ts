import { useAuthStore } from '@/stores/auth';
import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { storeToRefs } from 'pinia';
import { routeName } from '@/router/routes';

export async function authGuard(to: RouteLocationNormalizedGeneric) {
  const authStore = useAuthStore();
  const { authStateReady, logout } = authStore;
  const { isAuthenticated } = storeToRefs(authStore);
  const requiresAuth = to.meta.requiresAuth;
  const isAuth = to.meta.isAuth;

  await authStateReady;

  if (requiresAuth && !isAuthenticated.value) {
    await logout();
    return { name: routeName.LOGIN };
  }

  if (isAuth && isAuthenticated.value) {
    return { name: routeName.PRODUCT_LIST };
  }
}
