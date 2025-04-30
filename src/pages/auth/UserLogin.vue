<template>
  <section>
    <PageTitle>Login</PageTitle>

    <BaseCard customClasses="shadow-lg p-8 max-w-lg mx-auto">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="border p-3 w-full rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border p-3 w-full rounded"
          required
        />

        <BaseButton mode="submit" customClasses="w-full">Login</BaseButton>
        <p class="text-center uppercase text-gray-400 py-2">or</p>
        <router-link
          :to="{ name: routeName.REGISTER }"
          class="px-4 py-3 rounded-md w-full block text-center font-semibold border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        >
          Register
        </router-link>

        <div v-if="error" class="text-red-500 text-sm mt-2">
          {{ error }}
        </div>
      </form>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import BaseButton from '@/components/form/BaseButton.vue';
  import BaseCard from '@/components/UI/BaseCard.vue';
  import PageTitle from '@/components/UI/PageTitle.vue';
  import { routeName } from '@/router/routes';

  const authStore = useAuthStore();
  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const { login, error } = authStore;

  const handleLogin = async () => {
    try {
      await login(email.value, password.value);
      router.push({ name: routeName.PRODUCT_LIST });
    } catch (err) {
      console.error(err);
    }
  };
</script>
