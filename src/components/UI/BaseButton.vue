<template>
	<button
		:type="mode ?? 'button'"
		class="bg-indigo-600 text-white rounded-md hover:bg-blue-700"
		:class="customClasses"
		@click="clickHandler"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';

	defineProps<{
		customClasses?: string;
		mode?: 'button' | 'submit';
		clickHandler?: () => void;
	}>();
</script>