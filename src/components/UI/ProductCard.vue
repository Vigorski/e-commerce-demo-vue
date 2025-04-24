<template>
  <BaseCard customClasses="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden animate-fade-in">
		<SaleBadge v-if="product.isOnSale">
			On Sale
		</SaleBadge>
    <div
      class="h-44 bg-gray-200 flex items-center justify-center overflow-hidden"
    >
      <img
        v-if="product.image"
        :src="product.image"
        alt="Product image"
        class="object-cover w-full h-full"
        loading="lazy"
      />
      <div v-else class="text-gray-400">No image</div>
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h2 class="text-lg font-semibold text-gray-800 truncate">
        {{ product.title }}
      </h2>
      <p class="text-sm text-gray-600 line-clamp-2 mt-1">
        {{ product.description }}
      </p>
      <div class="mt-auto flex items-center justify-between pt-4">
				<div class="flex flex-col">
					<span :class="product.isOnSale ? 'line-through text-gray-300' : 'font-bold text-indigo-600 text-lg'">
						${{ product.price.toFixed(2) }}
					</span>
					<span v-if="product.isOnSale" class="font-bold text-lg text-rose-500">
						${{ product.salePrice?.toFixed(2) }}
					</span>
				</div>
				<BaseButton
					customClasses="text-sm px-4 py-2"
					:clickHandler="addToCart.bind(null, product)">
					Add to cart
				</BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
  import BaseCard from '@/components/UI/BaseCard.vue';
	import BaseButton from '@/components/UI/BaseButton.vue';
  import type { Product } from '@/customTypes/product';
	import SaleBadge from './SaleBadge.vue';

  defineProps<{
    product: Product;
    addToCart: (product: Product) => void;
  }>();
</script>
