<template>
  <section class="max-w-md mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-8">Register</h1>

    <form @submit.prevent="handleRegister" class="space-y-6">
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

      <BaseButton mode="submit" customClasses="w-full">Register</BaseButton>

      <div v-if="error" class="text-red-500 text-sm mt-2">
        {{ error }}
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import BaseButton from '@/components/form/BaseButton.vue';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const { register, error } = authStore;

  const handleRegister = async () => {
    try {
      await register(email.value, password.value);
      router.push({ name: 'ProductList' });
    } catch (err) {
      console.error(err);
    }
  };
</script>
