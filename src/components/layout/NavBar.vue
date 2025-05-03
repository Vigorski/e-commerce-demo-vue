<template>
  <nav
    class="sticky top-0 z-50 bg-white py-4 px-6 shadow-sm border-b flex justify-between items-center"
  >
    <router-link
      :to="{ name: routeName.PRODUCT_LIST }"
      class="flex items-center gap-2 text-xl font-bold text-gray-700"
    >
      <ShoppingBagIcon class="w-6 h-6 text-cyan-600" />
      <span>E-Shop Demo</span>
    </router-link>

    <div class="flex items-center gap-6 text-gray-700">
      <router-link
        v-if="isAuthenticated"
        :to="{ name: routeName.ADD_PRODUCT }"
        class="flex items-center gap-1 hover:text-cyan-600"
      >
        <PlusCircleIcon class="w-6 h-6 text-cyan-600" />
        <span>Add Products</span>
      </router-link>
      <router-link
        :to="{ name: routeName.CART }"
        class="flex items-center gap-1 hover:text-cyan-600"
      >
        <ShoppingCartIcon class="w-6 h-6 text-cyan-600" />
        <span>Cart ({{ cart.itemCount }})</span>
      </router-link>

      <UserMenu />
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCartStore } from '@/stores/cart';
  import { useAuthStore } from '@/stores/auth';
  import {
    ShoppingCartIcon,
    ShoppingBagIcon,
    PlusCircleIcon,
  } from '@heroicons/vue/24/outline';
  import { routeName } from '@/router/routes';
  import UserMenu from '../user/UserMenu.vue';

  const cart = useCartStore();
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
</script>
