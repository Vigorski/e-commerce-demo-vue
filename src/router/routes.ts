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
    component: () => import('@/pages/products/ProductList.vue'),
  },
  {
    path: routePath.CART,
    name: routeName.CART,
    component: () => import('@/pages/cart/TheCart.vue'),
  },
  {
    path: routePath.ADD_PRODUCT,
    name: routeName.ADD_PRODUCT,
    component: () => import('@/pages/products/AddProduct.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: routePath.PRODUCT_DETAILS,
    name: routeName.PRODUCT_DETAILS,
    component: () => import('@/pages/products/ProductDetails.vue'),
  },
  {
    path: routePath.LOGIN,
    name: routeName.LOGIN,
    component: () => import('@/pages/auth/UserLogin.vue'),
    meta: { isAuth: true },
  },
  {
    path: routePath.REGISTER,
    name: routeName.REGISTER,
    component: () => import('@/pages/auth/UserRegister.vue'),
    meta: { isAuth: true },
  },
  {
    path: routePath.NOT_FOUND,
    name: routeName.NOT_FOUND,
    component: () => import('@/pages/NotFound.vue'),
  },
];
