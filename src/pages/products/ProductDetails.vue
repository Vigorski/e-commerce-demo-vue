<template>
  <section>
    <SkeletonCard v-if="isLoading" />

    <ReloadCard
      v-else-if="!isLoading && error"
      :title="error.message"
      :reloadHandler="handleProductLoad"
      class="mx-auto mt-10 max-w-xl"
    />

    <div
      v-else-if="!isLoading && product"
      class="grid md:grid-cols-2 gap-8 items-start"
    >
      <div
        v-motion
        :initial="{ opacity: 0, y: -50 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="300"
        class="min-h-44 bg-gray-200 flex items-center justify-center rounded-2xl shadow-lg overflow-hidden"
      >
        <SaleBadge v-if="product.isOnSale" />
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.title"
          class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
        <div v-else class="text-gray-400">No image</div>
      </div>

      <div class="space-y-6">
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0 }"
          :duration="300"
          :delay="100"
        >
          <p class="text-sm text-gray-400 mb-1 tracking-wide">Title</p>
          <h1 class="text-4xl font-extrabold text-gray-900">
            {{ product.title }}
          </h1>
        </div>
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0 }"
          :duration="300"
          :delay="200"
        >
          <p class="text-sm text-gray-400 mb-1 tracking-wide">Description</p>
          <p class="text-base text-gray-700 leading-relaxed">
            {{ product.description }}
          </p>
        </div>
        <div
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0 }"
          :duration="300"
          :delay="300"
        >
          <p class="text-sm text-gray-400 mb-1 tracking-wide">Price</p>
          <DiscountPrice :product="product" priceFontSize="text-2xl" />
        </div>

        <BaseButton
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0 }"
          :duration="300"
          :delay="400"
          customClasses="text-base px-6 py-3 mt-20"
          :clickHandler="addToCart.bind(null, product)"
        >
          Add to Cart
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCartStore } from '@/stores/cart';
  import { storeToRefs } from 'pinia';
  import { useProductStore } from '@/stores/products';
  import SkeletonCard from '@/components/UI/SkeletonCard.vue';
  import ReloadCard from '@/components/shared/ReloadCard.vue';
  import BaseButton from '@/components/form/BaseButton.vue';
  import SaleBadge from '@/components/UI/SaleBadge.vue';
  import type { Product } from '@/customTypes/product';
  import { useFetchItemById } from '@/hooks/useFetchItemById';
  import DiscountPrice from '@/components/shared/DiscountPrice.vue';

  const { product, isLoading, error, fetchItemById } =
    useFetchItemById<Product>();
  const { addItem } = useCartStore();
  const route = useRoute();
  const store = useProductStore();
  const { products } = storeToRefs(store);

  const addToCart = (product: Product) => {
    addItem(product);
  };

  const handleProductLoad = async () => {
    const productId = route.params.productId as string;
    const productIsInStore = products.value?.find(
      (product) => product.id === productId
    );

    if (productIsInStore) {
      product.value = productIsInStore;
    } else {
      await fetchItemById('products', productId);
    }
  };

  onMounted(handleProductLoad);
</script>
