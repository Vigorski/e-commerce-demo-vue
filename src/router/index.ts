import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@/utilities/authGuard';
import { routes } from '@/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
