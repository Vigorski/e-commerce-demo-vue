<template>
	<h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
		Shop Our Products
	</h1>

	<div
		class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		<template v-if="isLoading">
			<SkeletonCard v-for="n in 3" :key="n" />
		</template>

		<transition-group name="fade" tag="div" v-else class="contents">
			<ProductCard
				v-for="(product, index) in products"
				:key="product.id"
				:product="product"
				:add-to-cart="addToCart"
				:style="`animation-delay: ${index * 100}ms`"
			></ProductCard>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useProductStore } from '@/stores/products';
  import ProductCard from '@/components/UI/ProductCard.vue';
  import SkeletonCard from '@/components/UI/SkeletonCard.vue';
  import type { Product } from '@/customTypes/product';
  import { storeToRefs } from 'pinia';

  const store = useProductStore();
  const { products } = storeToRefs(store);
  const { fetchProducts } = store;
  const { addItem } = useCartStore();

  const isLoading = ref(true);

  const addToCart = (product: Product) => {
		console.log('Adding to cart:', product);
    addItem(product);
  };

  onMounted(async () => {
    try {
      await fetchProducts();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      isLoading.value = false;
    }
  });
</script>
