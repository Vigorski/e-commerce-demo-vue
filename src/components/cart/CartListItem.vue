<template>
  <div class="flex justify-between border-b pb-4">
    <router-link
      :to="`/product-details/${cartItem.id}`"
      class="flex items-center gap-4"
    >
      <img
        :src="cartItem.image"
        alt="Product image"
        class="w-20 h-20 object-cover rounded-md"
      />
      <div>
        <h2 class="text-lg font-semibold text-gray-800">
          {{ cartItem.title }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          Quantity: {{ cartItem.quantity }}
        </p>
      </div>
    </router-link>
    <div class="text-right flex flex-col justify-between items-end">
      <DiscountPrice :product="cartItem" priceFontSize="text-md" />

      <BaseButton
        btnStyle="link"
        :clickHandler="removeItemHandler"
        customClasses="pl-0 pr-0 text-sm flex items-center text-md hover:underline"
      >
        <TrashIcon class="h-4 w-4 mr-2" />
        <span>Remove</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CartItem } from '@/customTypes/cart';
  import { TrashIcon } from '@heroicons/vue/24/outline';
  import BaseButton from '@/components/form/BaseButton.vue';
  import DiscountPrice from '@/components/shared/DiscountPrice.vue';

  defineProps<{
    cartItem: CartItem;
    removeItemHandler: () => void;
  }>();
</script>
