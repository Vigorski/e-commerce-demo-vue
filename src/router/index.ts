import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/pages/products/ProductList.vue';
import TheCart from '@/pages/cart/TheCart.vue';
import AddProduct from '@/pages/products/AddProduct.vue';
import NotFound from '@/pages/NotFound.vue';
import ProductDetails from '@/pages/products/ProductDetails.vue';
import UserLogin from '@/pages/auth/UserLogin.vue';
import UserRegister from '@/pages/auth/UserRegister.vue';
import { authGuard } from '@/utilities/authGuard';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/cart', name: 'Cart', component: TheCart },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
    meta: { requiresAuth: true },
  },
  {
    path: '/product-details/:productId',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
    meta: { isAuth: true },
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
    meta: { isAuth: true },
  },
  { path: '/:NotFound(.*)', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
