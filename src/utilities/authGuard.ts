import { useAuthStore } from '@/stores/auth';
import type {
  RouteLocationNormalizedGeneric,
  // RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';
// import { isSessionExpired } from './isSessionExpired';
import { storeToRefs } from 'pinia';

export async function authGuard(
  to: RouteLocationNormalizedGeneric
  // _: RouteLocationNormalizedLoadedGeneric,
) {
  const authStore = useAuthStore();
  await authStore.authStateReady;

  const { user } = storeToRefs(authStore);
  const requiresAuth = to.meta.requiresAuth;
  const isAuth = to.meta.isAuth;
  console.log(user.value);

  if (requiresAuth && !authStore.isLoggedIn) {
    await authStore.logout();
    // console.log(to);
    return { name: 'UserLogin' };
  }

  if (isAuth && authStore.isLoggedIn) {
    return { name: 'ProductList' };
  }
}
