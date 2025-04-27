<template>
  <div class="flex" :class="directionCol ? 'flex-col' : 'items-center'">
    <p
      :class="
        product.isOnSale
          ? 'line-through text-gray-400'
          : `font-bold text-indigo-600 ${priceFontSize ?? 'text-lg'}`
      "
    >
      ${{ totalPrice }}
    </p>
    <p
      v-if="product.isOnSale && product.salePrice"
      class="font-bold text-rose-500"
      :class="[directionCol ? '' : 'ml-4', priceFontSize ?? 'text-lg']"
    >
      ${{ totalSalesPrice }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { CartItem } from '@/customTypes/cart';

  const props = defineProps<{
    product: CartItem;
    directionCol?: boolean;
    priceFontSize?: string;
  }>();

  const quantity = props.product.quantity ?? 1;
  const price = props.product.price ?? 0;
  const salesPrice = props.product.salePrice ?? 0;

  const totalPrice = computed(() => {
    return (price * quantity).toFixed(2);
  });
  const totalSalesPrice = computed(() => {
    return (salesPrice * quantity).toFixed(2);
  });
</script>
