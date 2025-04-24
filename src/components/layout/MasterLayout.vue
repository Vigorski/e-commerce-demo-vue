<template>
  <div class="min-h-screen">
    <NavBar />
		<div class="max-w-7xl mx-auto px-4 py-10">
			<slot></slot>
		</div>
  </div>
</template>

<script setup lang="ts">
	import NavBar from '@/components/layout/NavBar.vue';
</script>