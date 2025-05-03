<template>
  <div class="relative">
    <button
      @click="toggleMenu"
      class="flex items-center gap-2 hover:text-cyan-600"
    >
      <UserCircleIcon class="w-6 h-6 text-cyan-600" />
    </button>

    <BaseCard v-if="showMenu" class="absolute top-8 right-0 w-64 p-4 space-y-4">
      <div class="flex items-center gap-3">
        <UserCircleIcon class="w-10 h-10 text-cyan-600" />
        <div>
          <h3 class="text-gray-900 font-semibold text-sm">
            {{ user?.displayName || 'Guest' }}
          </h3>
          <p class="text-gray-500 text-xs">
            {{
              isAuthenticated
                ? 'Manage products'
                : 'Login to access your account'
            }}
          </p>
        </div>
      </div>
      <div class="space-y-2 mt-4">
        <BaseButton
          v-if="isAuthenticated"
          :clickHandler="handleLogout"
          btnStyle="outlined"
          customClasses="w-full"
        >
          Logout
        </BaseButton>
        <BaseButton
          v-else
          :clickHandler="handleLogin"
          btnStyle="outlined"
          customClasses="w-full"
        >
          Login
        </BaseButton>
      </div>
      <hr class="border-gray-200" />
      <div>
        <p class="text-xs text-gray-400">
          Need help? Visit our
          <a href="#" class="text-cyan-600 hover:underline">Support Center</a>
          .
        </p>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { UserCircleIcon } from '@heroicons/vue/24/outline';
  import BaseButton from '@/components/form/BaseButton.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { routeName } from '@/router/routes';
  import { useToast } from 'vue-toastification';
  import BaseCard from '../UI/BaseCard.vue';

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const { user, isAuthenticated } = storeToRefs(authStore);
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

  function handleLogin() {
    router.push({ name: routeName.LOGIN });
  }
</script>
