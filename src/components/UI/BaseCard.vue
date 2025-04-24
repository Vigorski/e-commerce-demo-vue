<template>
	<div
		class="bg-white rounded-lg shadow-md"
		:class="customClasses">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
	customClasses?: string;
}>();
</script>