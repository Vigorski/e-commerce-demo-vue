import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/pages/ProductList.vue';
import TheCart from '@/pages/TheCart.vue';
import AddProduct from '@/pages/AddProduct.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/cart', name: 'Cart', component: TheCart },
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
