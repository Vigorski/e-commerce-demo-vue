import ProductList from '@/pages/products/ProductList.vue';
import TheCart from '@/pages/cart/TheCart.vue';
import AddProduct from '@/pages/products/AddProduct.vue';
import NotFound from '@/pages/NotFound.vue';
import ProductDetails from '@/pages/products/ProductDetails.vue';
import UserLogin from '@/pages/auth/UserLogin.vue';
import UserRegister from '@/pages/auth/UserRegister.vue';

export enum routeName {
  ADD_PRODUCT = 'AddProduct',
  PRODUCT_LIST = 'ProductList',
  PRODUCT_DETAILS = 'ProductDetails',
  LOGIN = 'UserLogin',
  REGISTER = 'UserRegister',
  CART = 'Cart',
  NOT_FOUND = 'NotFound',
}

export enum routePath {
  ADD_PRODUCT = '/add-product',
  PRODUCT_LIST = '/',
  PRODUCT_DETAILS = '/product-details/:productId',
  LOGIN = '/login',
  REGISTER = '/register',
  CART = '/cart',
  NOT_FOUND = '/:NotFound(.*)',
}

export const routes = [
  {
    path: routePath.PRODUCT_LIST,
    name: routeName.PRODUCT_LIST,
    component: ProductList,
  },
  { path: routePath.CART, name: routeName.CART, component: TheCart },
  {
    path: routePath.ADD_PRODUCT,
    name: routeName.ADD_PRODUCT,
    component: AddProduct,
    meta: { requiresAuth: true },
  },
  {
    path: routePath.PRODUCT_DETAILS,
    name: routeName.PRODUCT_DETAILS,
    component: ProductDetails,
  },
  {
    path: routePath.LOGIN,
    name: routeName.LOGIN,
    component: UserLogin,
    meta: { isAuth: true },
  },
  {
    path: routePath.REGISTER,
    name: routeName.REGISTER,
    component: UserRegister,
    meta: { isAuth: true },
  },
  { path: routePath.NOT_FOUND, name: routeName.NOT_FOUND, component: NotFound },
];
