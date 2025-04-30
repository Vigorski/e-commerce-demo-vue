<template>
  <div class="flex justify-between border-b pb-4">
    <router-link
      :to="{
        name: routeName.PRODUCT_DETAILS,
        params: { productId: cartItem.id },
      }"
      class="flex items-center gap-4"
    >
      <div
        class="w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden"
      >
        <img
          v-if="cartItem.image"
          :src="cartItem.image"
          alt="Product image"
          class="object-cover w-full h-full"
          loading="lazy"
        />
        <div v-else class="text-gray-400">No image</div>
      </div>
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
  import { routeName } from '@/router/routes';

  defineProps<{
    cartItem: CartItem;
    removeItemHandler: () => void;
  }>();
</script>
