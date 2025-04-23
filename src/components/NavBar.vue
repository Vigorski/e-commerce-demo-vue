<template>
  <nav
    class="bg-gray-100 py-3 px-6 flex justify-between items-center rounded-lg shadow mb-6"
  >
    <router-link to="/" class="text-xl font-bold">Shop</router-link>
    <router-link to="/cart" class="text-blue-600 hover:underline">
      Cart ({{ cart.itemCount }}) - \${{ cart.total.toFixed(2) }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
  import { useCartStore } from '../stores/cart';
  const cart = useCartStore();
</script>
