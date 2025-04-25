import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/pages/ProductList.vue';
import TheCart from '@/pages/TheCart.vue';
import AddProduct from '@/pages/AddProduct.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/cart', name: 'Cart', component: TheCart },
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
  { path: '/:NotFound(.*)', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
