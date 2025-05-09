<template>
  <div class="flex items-center space-x-2">
    <input
      :id="name"
      type="checkbox"
      :checked="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
      class="h-5 w-5 text-indigo-600 border-gray-300 rounded"
    />
    <label :for="name" class="text-sm text-gray-700 font-medium">
      {{ labelText }}
    </label>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    name: string;
    labelText: string;
    modelValue: boolean;
  }>();

  defineEmits(['update:modelValue']);
</script>
