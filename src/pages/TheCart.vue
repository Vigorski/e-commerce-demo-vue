<template>
  <section>
    <PageTitle>Your Cart</PageTitle>

    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-14">
      <BaseCard
        customClasses="shadow-lg p-8 h-fit sticky top-6 md:col-span-3 space-y-6"
      >
        <template v-for="item in cartItems" :key="item.id">
          <CartListItem
            :cartItem="item"
            :removeItemHandler="removeItem.bind(null, item.id)"
          />
        </template>
      </BaseCard>
      <BaseCard customClasses="shadow-lg p-8 h-fit md:col-span-2 sticky top-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

        <div class="space-y-4">
          <div class="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between text-gray-700">
            <span>Amount Saved</span>
            <span class="text-green-600">- $0.00</span>
          </div>

          <div
            class="border-t pt-4 flex justify-between font-bold text-gray-800 text-lg"
          >
            <span>Total</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>

          <div class="mt-6 space-y-4">
            <BaseButton customClasses="w-full">Checkout</BaseButton>

            <BaseButton
              customClasses="w-full border-rose-500 text-rose-500 font-semibold"
              btnStyle="outlined"
              :clickHandler="clearCart"
            >
              Clear Cart
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>
  </section>
</template>

<script setup lang="ts">
  import PageTitle from '@/components/UI/PageTitle.vue';
  import { useCartStore } from '@/stores/cart';
  import BaseButton from '@/components/form/BaseButton.vue';
  import BaseCard from '@/components/UI/BaseCard.vue';
  import CartListItem from '@/components/cart/CartListItem.vue';
  import { storeToRefs } from 'pinia';

  const store = useCartStore();
  const { cartItems, totalPrice } = storeToRefs(store);
  const { removeItem, clearCart } = store;
</script>
