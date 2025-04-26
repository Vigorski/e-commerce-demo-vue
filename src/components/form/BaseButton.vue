<template>
  <button
    :type="mode ?? 'button'"
    :class="buttonClasses"
    @click="clickHandler"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import { defineProps, computed } from 'vue';

  const props = defineProps<{
    customClasses?: string;
    mode?: 'button' | 'submit';
    btnStyle?: 'filled' | 'outlined' | 'link';
    disabled?: boolean;
    clickHandler?: () => void;
  }>();

  const buttonClasses = computed(() => {
    const base = 'px-4 py-3 rounded-md';
    const btnStyle = {
      filled: 'bg-indigo-600 text-white hover:bg-blue-700',
      outlined:
        'font-semibold border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
      link: 'bg-transparent',
      disabled: 'opacity-50 cursor-not-allowed',
    };

    return [
      base,
      props.btnStyle ? btnStyle[props.btnStyle] : btnStyle.filled,
      props.disabled ? btnStyle.disabled : '',
      props.customClasses || '',
    ].join(' ');
  });
</script>
