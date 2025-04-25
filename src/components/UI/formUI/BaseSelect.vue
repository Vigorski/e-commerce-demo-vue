<template>
  <div :class="inline && 'flex items-center'">
    <label
      :for="name"
      class="text-gray-700 text-sm font-semibold"
      :class="labelClasses"
    >
      {{ labelText }}
    </label>
    <div class="relative" :class="!inline ? 'mt-2' : 'ml-3'">
      <div
        v-if="$slots.icon"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>
      <select
        :id="name"
        :disabled="disabled"
        :class="selectClassesComputed"
        @change="
          $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
        "
        :value="modelValue"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, useSlots } from 'vue';

  const slots = useSlots();

  const props = defineProps<{
    name: string;
    labelText: string;
    modelValue: unknown;
    options?: { value: string | number; label: string }[];
    placeholder?: string;
    disabled?: boolean;
    selectClasses?: string;
    labelClasses?: string;
    inline?: boolean;
  }>();

  const selectClassesComputed = computed(() => {
    const base = 'border border-gray-300 p-2 w-full rounded-md text-gray-700';
    const withIcon = 'pl-12';
    const disabledStyles = 'opacity-50 cursor-not-allowed';

    return [
      base,
      slots.icon ? withIcon : '',
      props.disabled ? disabledStyles : '',
      props.selectClasses || '',
    ].join(' ');
  });

  defineEmits(['update:modelValue']);
</script>
