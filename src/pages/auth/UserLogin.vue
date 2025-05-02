<template>
  <section>
    <PageTitle>Login</PageTitle>

    <BaseCard customClasses="shadow-lg p-8 max-w-lg mx-auto">
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <BaseInput
          v-model.trim="email.val"
          name="email"
          labelText="E-mail"
          :error="email.error"
        >
          <template #icon>
            <AtSymbolIcon class="h-5 w-5 text-gray-400" />
          </template>
        </BaseInput>
        <BaseInput
          v-model.trim="password.val"
          name="password"
          labelText="Password"
          mode="password"
          :error="password.error"
        >
          <template #icon>
            <LockClosedIcon class="h-5 w-5 text-gray-400" />
          </template>
        </BaseInput>

        <BaseButton mode="submit" customClasses="w-full">Login</BaseButton>
        <p class="text-center">
          Don't have a Fraxi account?
          <router-link
            :to="{ name: routeName.REGISTER }"
            class="font-semibold text-indigo-600"
          >
            Register
          </router-link>
        </p>
      </form>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { AtSymbolIcon, LockClosedIcon } from '@heroicons/vue/24/outline';
  import { useAuthStore } from '@/stores/auth';
  import BaseButton from '@/components/form/BaseButton.vue';
  import BaseInput from '@/components/form/BaseInput.vue';
  import BaseCard from '@/components/UI/BaseCard.vue';
  import PageTitle from '@/components/UI/PageTitle.vue';
  import { routeName } from '@/router/routes';
  import { useLoginFields } from '@/hooks/useLoginFields';

  const authStore = useAuthStore();
  const router = useRouter();
  const { fields, validateForm } = useLoginFields();

  const { email, password } = fields;
  const { login, error } = authStore;

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login(email.val, password.val);
      router.push({ name: routeName.PRODUCT_LIST });
    } catch (err) {
      console.error(err);
    }
  };
</script>
