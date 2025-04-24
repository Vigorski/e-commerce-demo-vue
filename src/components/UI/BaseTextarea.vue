<template>
  <div>
    <label :for="name" class="text-gray-700 font-semibold" :class="labelClasses">
      {{ labelText }}
    </label>
    <div class="mt-2 relative">
      <div v-if="$slots.icon" class="absolute left-3 top-6 transform -translate-y-1/2 pointer-events-none">
        <slot name="icon"></slot>
      </div>
      <textarea
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :placeholder="placeholder"
        :rows="rows ?? 3"
        :disabled="disabled"
        class="border p-3 pl-12 w-full rounded-md text-gray-700 resize-none flex-1"
        :class="inputClasses"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
	defineProps<{
		modelValue: string;
		name: string;
		labelText: string;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
		inputClasses?: string;
		labelClasses?: string;
	}>();

	defineEmits(['update:modelValue']);
</script>