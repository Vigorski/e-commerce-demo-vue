<template>
  <section>
    <PageTitle>Register</PageTitle>

    <BaseCard customClasses="shadow-lg p-8 max-w-lg mx-auto">
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <BaseInput
          v-model.trim="firstName.val"
          name="firstName"
          labelText="First name"
          :error="firstName.error"
        >
          <template #icon>
            <UserIcon class="h-5 w-5 text-gray-400" />
          </template>
        </BaseInput>
        <BaseInput
          v-model.trim="lastName.val"
          name="lastName"
          labelText="Last name"
          :error="lastName.error"
        >
          <template #icon>
            <UserIcon class="h-5 w-5 text-gray-400" />
          </template>
        </BaseInput>
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
        <BaseInput
          v-model.trim="confirmPassword.val"
          name="confirmPassword"
          labelText="Confirm password"
          mode="password"
          :error="confirmPassword.error"
        >
          <template #icon>
            <LockClosedIcon class="h-5 w-5 text-gray-400" />
          </template>
        </BaseInput>

        <BaseButton mode="submit" customClasses="w-full">Register</BaseButton>
        <p class="text-center uppercase text-gray-400 py-2">or</p>
        <router-link
          :to="{ name: routeName.LOGIN }"
          class="px-4 py-3 rounded-md w-full block text-center font-semibold border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        >
          Login
        </router-link>
      </form>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import {
    AtSymbolIcon,
    UserIcon,
    LockClosedIcon,
  } from '@heroicons/vue/24/outline';
  import { useAuthStore } from '@/stores/auth';
  import BaseButton from '@/components/form/BaseButton.vue';
  import BaseInput from '@/components/form/BaseInput.vue';
  import BaseCard from '@/components/UI/BaseCard.vue';
  import PageTitle from '@/components/UI/PageTitle.vue';
  import { routeName } from '@/router/routes';
  import { useRegisterFields } from '@/hooks/useRegisterFields';

  const authStore = useAuthStore();
  const router = useRouter();
  const toast = useToast();
  const { register, error } = authStore;
  const { fields, validateForm } = useRegisterFields();

  const { firstName, lastName, email, password, confirmPassword } = fields;

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(email.val, password.val, firstName.val, lastName.val);
      toast.success('Registered user successfully!');
      router.push({ name: routeName.PRODUCT_LIST });
    } catch (err) {
      toast.error('Unable to register user.');
      console.error(err);
    }
  };
</script>
