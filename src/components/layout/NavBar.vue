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

      <div class="relative">
        <button
          @click="toggleMenu"
          class="flex items-center gap-2 hover:text-cyan-600"
        >
          <UserCircleIcon class="w-6 h-6 text-cyan-600" />
        </button>

        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md"
        >
          <BaseButton
            v-if="user"
            :clickHandler="handleLogout"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </BaseButton>
          <router-link
            v-else
            :to="{ name: routeName.LOGIN }"
            class="hover:text-cyan-600"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useAuthStore } from '@/stores/auth';
  import {
    ShoppingCartIcon,
    ShoppingBagIcon,
    PlusCircleIcon,
    UserCircleIcon,
  } from '@heroicons/vue/24/outline';
  import BaseButton from '@/components/form/BaseButton.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { routeName } from '@/router/routes';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();
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
    toast.info('User logged out.');

    if (route.meta.requiresAuth) {
      router.push({ name: routeName.PRODUCT_LIST });
    }
  }
</script>
