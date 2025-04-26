<template>
  <div class="flex" :class="directionCol ? 'flex-col' : 'items-center'">
    <p
      :class="
        product.isOnSale
          ? 'line-through text-gray-300'
          : `font-bold text-indigo-600 ${priceFontSize ?? 'text-lg'}`
      "
    >
      ${{ product.price.toFixed(2) }}
    </p>
    <p
      v-if="product.isOnSale"
      class="font-bold text-2xl text-rose-500"
      :class="[directionCol ? '' : 'ml-4', priceFontSize ?? 'text-lg']"
    >
      ${{ product.salePrice?.toFixed(2) }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import type { Product } from '@/customTypes/product';

  defineProps<{
    product: Product;
    directionCol?: boolean;
    priceFontSize?: string;
  }>();
</script>
