<template>
  <div>
    <label :for="name" class="text-gray-700 font-semibold" :class="labelClasses">
      {{ labelText }}
    </label>
		<div class="relative mt-2">
      <div v-if="$slots.icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <slot name="icon"></slot>
      </div>
      <input
				:id="name"
				:type="mode ?? 'text'"
				:value="modelValue"
				@input="$emit('update:modelValue', $event.target.value)"
				:disabled="disabled"
				:placeholder="placeholder ?? labelText"
				:step="mode === 'number' ? step : undefined"
				:min="mode === 'number' ? min : undefined"
				class="border p-3 pl-12 w-full rounded-md text-gray-700"
				:class="inputClasses"
			/>
    </div>
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
  mode?: 'text' | 'number';
  disabled?: boolean;
  step?: string;
  min?: string;
}>();

defineEmits(['update:modelValue']);
</script>
