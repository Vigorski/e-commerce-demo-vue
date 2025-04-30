<template>
  <nav
    class="sticky top-0 z-50 bg-white py-4 px-6 shadow-sm border-b flex justify-between items-center"
  >
    <router-link
      :to="{ name: 'ProductList' }"
      class="flex items-center gap-2 text-xl font-bold text-gray-700"
    >
      <ShoppingBagIcon class="w-6 h-6 text-cyan-600" />
      <span>E-Shop Demo</span>
    </router-link>

    <div class="flex items-center gap-6 text-gray-700">
      <router-link
        :to="{ name: 'AddProduct' }"
        class="flex items-center gap-1 hover:text-cyan-600"
      >
        <PlusCircleIcon class="w-6 h-6 text-cyan-600" />
        <span>Add Products</span>
      </router-link>
      <router-link
        :to="{ name: 'Cart' }"
        class="flex items-center gap-1 hover:text-cyan-600"
      >
        <ShoppingCartIcon class="w-6 h-6 text-cyan-600" />
        <span>Cart ({{ cart.itemCount }})</span>
      </router-link>

      <div v-if="user" class="relative">
        <button
          @click="toggleMenu"
          class="flex items-center gap-2 hover:text-cyan-600"
        >
          <UserCircleIcon class="w-6 h-6 text-cyan-600" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md"
        >
          <BaseButton
            :clickHandler="handleLogout"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </BaseButton>
        </div>
      </div>

      <div v-else class="flex gap-4">
        <router-link :to="{ name: 'UserLogin' }" class="hover:text-cyan-600">
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useCartStore } from '@/stores/cart';
  import { useAuthStore } from '@/stores/auth';
  import {
    ShoppingCartIcon,
    ShoppingBagIcon,
    PlusCircleIcon,
    UserCircleIcon,
  } from '@heroicons/vue/24/outline';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import BaseButton from '../form/BaseButton.vue';

  const cart = useCartStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const { logout } = authStore;
  const showMenu = ref(false);

  function toggleMenu() {
    showMenu.value = !showMenu.value;
  }

  async function handleLogout() {
    await logout();
    showMenu.value = false;
  }
</script>
