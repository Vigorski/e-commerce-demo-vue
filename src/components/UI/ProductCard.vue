<template>
  <BaseCard customClasses="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden animate-fade-in">
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
        <span class="text-indigo-600 font-bold text-lg">
          ${{ product.price.toFixed(2) }}
        </span>
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

  defineProps<{
    product: Product;
    addToCart: (product: Product) => void;
  }>();
</script>
