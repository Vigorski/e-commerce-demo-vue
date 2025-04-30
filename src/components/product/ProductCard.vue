<template>
  <BaseCard
    customClasses="hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
  >
    <SaleBadge v-if="product.isOnSale" />
    <router-link
      :to="{ name: 'ProductDetails', params: { productId: product.id } }"
    >
      <div
        class="h-44 bg-gray-200 flex items-center justify-center overflow-hidden"
      >
        <img
          v-if="product.image"
          :src="product.image"
          alt="Product image"
          class="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div v-else class="text-gray-400">No image</div>
      </div>
    </router-link>

    <div class="p-5 flex flex-col flex-grow">
      <h2 class="text-lg font-semibold text-gray-800 truncate">
        {{ product.title }}
      </h2>
      <p class="text-sm text-gray-600 line-clamp-2 mt-1">
        {{ product.description }}
      </p>
      <div class="mt-auto flex items-center justify-between pt-4">
        <DiscountPrice :product="product" directionCol />
        <BaseButton
          customClasses="text-sm px-4 py-2"
          :clickHandler="addToCart.bind(null, product)"
        >
          Add to cart
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
  import BaseCard from '@/components/UI/BaseCard.vue';
  import BaseButton from '@/components/form/BaseButton.vue';
  import SaleBadge from '@/components/UI/SaleBadge.vue';
  import type { Product } from '@/customTypes/product';
  import DiscountPrice from '@/components/shared/DiscountPrice.vue';

  defineProps<{
    product: Product;
    addToCart: (product: Product) => void;
  }>();
</script>
