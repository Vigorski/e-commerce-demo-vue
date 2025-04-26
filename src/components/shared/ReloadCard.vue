<template>
  <div
    class="flex flex-col items-center justify-center text-center p-6 rounded-md border border-gray-300 bg-gray-100 text-gray-700"
  >
    <p class="text-lg font-semibold mb-2">{{ title }}</p>
    <p class="text-sm mb-4">
      Please check your internet connection and/or try reloading.
    </p>
    <BaseButton
      @click="reloadHandler"
      btnStyle="outlined"
      customClasses="w-full mt-4"
    >
      Reload
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import BaseButton from '@/components/form/BaseButton.vue';

  defineProps<{
    title: string;
    reloadHandler: () => void;
  }>();
</script>
