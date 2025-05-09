<template>
  <div class="bg-white rounded-lg shadow-md" :class="customClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    customClasses?: string;
  }>();
</script>
