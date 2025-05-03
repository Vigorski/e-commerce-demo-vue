<template>
  <section>
    <PageTitle>Your Cart</PageTitle>

    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-14">
      <div class="p-8 h-fit md:col-span-3 space-y-6">
        <template v-for="(item, index) in cartItems" :key="item.id">
          <CartListItem
            :cartItem="item"
            :removeItemHandler="removeItem.bind(null, item.id)"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :leave="{ opacity: 0, y: -20 }"
            :delay="index * 100"
            :duration="300"
          />
        </template>
      </div>
      <BaseCard
        customClasses="shadow-lg p-8 h-fit md:col-span-2 sticky top-6"
        v-motion
        :initial="{ opacity: 0, x: 30 }"
        :enter="{ opacity: 1, x: 0 }"
        :duration="300"
        :delay="500"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

        <div class="space-y-4">
          <div class="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>${{ subtotalPrice.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between text-gray-700">
            <span>Amount Saved</span>
            <span class="text-green-600">
              - ${{ (subtotalPrice - totalPrice).toFixed() }}
            </span>
          </div>

          <div
            class="border-t pt-4 flex justify-between font-bold text-gray-800 text-lg"
          >
            <span>Total</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>

          <div class="mt-6 space-y-4">
            <BaseButton :clickHandler="handleCheckout" customClasses="w-full">
              Checkout
            </BaseButton>

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
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const store = useCartStore();
  const { cartItems, totalPrice, subtotalPrice } = storeToRefs(store);
  const { removeItem, clearCart } = store;

  const handleCheckout = () => {
    toast.info('Thank you for using this demo!');
  };
</script>
