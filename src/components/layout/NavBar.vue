<template>
  <nav
    class="sticky top-0 z-50 bg-white py-4 px-6 shadow-sm border-b flex justify-between items-center"
  >
    <router-link
      to="/"
      class="flex items-center gap-2 text-xl font-bold text-gray-700"
    >
      <ShoppingBagIcon class="w-6 h-6 text-cyan-600" />
      <span>E-Shop Demo</span>
    </router-link>

    <div class="flex items-center gap-6 text-gray-700">
      <router-link
        to="/add-product"
        class="flex items-center gap-1 hover:text-cyan-600"
      >
        <PlusCircleIcon class="w-6 h-6 text-cyan-600" />
        <span>Add Products</span>
      </router-link>
      <router-link
        to="/cart"
        class="flex items-center gap-1 hover:text-cyan-600"
      >
        <ShoppingCartIcon class="w-6 h-6 text-cyan-600" />
        <span>Cart ({{ cart.itemCount }})</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useCartStore } from '@/stores/cart';
  import {
    ShoppingCartIcon,
    ShoppingBagIcon,
    PlusCircleIcon,
  } from '@heroicons/vue/24/outline';

  const cart = useCartStore();
</script>
