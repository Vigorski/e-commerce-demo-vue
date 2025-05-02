<template>
  <div>
    <label
      :for="name"
      class="text-gray-700 font-semibold"
      :class="[labelClasses, error ? 'text-rose-500' : '']"
    >
      {{ labelText }}
    </label>
    <div class="relative mt-2">
      <div
        v-if="$slots.icon"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>
      <input
        :id="name"
        :type="mode ?? 'text'"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :disabled="disabled"
        :placeholder="placeholder ?? labelText"
        :step="mode === 'number' ? step : undefined"
        class="border p-3 pl-12 w-full rounded-md text-gray-700"
        :class="[inputClasses, error ? 'border-rose-500' : '']"
      />
    </div>
    <p v-if="error" class="text-rose-500 text-sm mt-2">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    modelValue: string | number;
    name: string;
    labelText: string;
    inputClasses?: string;
    labelClasses?: string;
    placeholder?: string;
    mode?: 'text' | 'number' | 'password';
    disabled?: boolean;
    step?: string;
    error?: string;
  }>();

  defineEmits(['update:modelValue']);
</script>
