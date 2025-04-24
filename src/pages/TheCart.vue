<template>
	<h1 class="text-2xl font-bold mb-4">Your Cart</h1>
	<div v-if="items.length === 0" class="text-gray-500">Cart is empty.</div>
	<div v-else>
		<div
			v-for="item in items"
			:key="item.id"
			class="flex justify-between border-b py-2"
		>
			<div>
				<p class="font-medium">{{ item.title }}</p>
				<p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
			</div>
			<div class="text-right">
				<p class="font-semibold">
					\${{ (item.price * item.quantity).toFixed(2) }}
				</p>
				<button
					@click="removeItem(item.id)"
					class="text-sm text-red-500 hover:underline"
				>
					Remove
				</button>
			</div>
		</div>
		<div class="mt-4 font-bold text-lg">Total: \${{ total.toFixed(2) }}</div>
		<button
			@click="clearCart()"
			class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
		>
			Clear Cart
		</button>
	</div>
</template>

<script setup lang="ts">
  import { useCartStore } from '../stores/cart';

  const { items, total, removeItem } = useCartStore();
</script>
