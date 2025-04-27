import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/pages/products/ProductList.vue';
import TheCart from '@/pages/cart/TheCart.vue';
import AddProduct from '@/pages/products/AddProduct.vue';
import NotFound from '@/pages/NotFound.vue';
import ProductDetails from '@/pages/products/ProductDetails.vue';

const routes = [
  { path: '/', name: 'ProductList', component: ProductList },
  { path: '/cart', name: 'Cart', component: TheCart },
  { path: '/add-product', name: 'AddProduct', component: AddProduct },
  {
    path: '/product-details/:productId',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  { path: '/:NotFound(.*)', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
