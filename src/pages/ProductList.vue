<template>
  <section>
    <PageTitle>Shop Our Products</PageTitle>

    <ProductFilters />

    <template v-if="isLoading">
      <SkeletonCard v-for="n in 3" :key="n" />
    </template>

    <ReloadCard
      v-else-if="!isLoading && errors?.fetchProducts"
      :title="errors.fetchProducts.message"
      :reloadHandler="handleFetchProducts"
      class="mx-auto mt-10 max-w-xl"
    />

    <div v-else-if="!isLoading && !products?.length">
      <h2 class="text-xl font-semibold text-gray-800 text-center">
        No products found
      </h2>
    </div>

    <div
      v-else
      class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :add-to-cart="addToCart"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :leave="{ opacity: 0, y: -20 }"
        :delay="index * 100"
        :duration="300"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useProductStore } from '@/stores/products';
  import ProductCard from '@/components/product/ProductCard.vue';
  import SkeletonCard from '@/components/UI/SkeletonCard.vue';
  import type { Product } from '@/customTypes/product';
  import { storeToRefs } from 'pinia';
  import ReloadCard from '@/components/shared/ReloadCard.vue';
  import ProductFilters from '@/components/product/ProductFilters.vue';
  import PageTitle from '@/components/UI/PageTitle.vue';

  const store = useProductStore();
  const { filteredProducts: products, errors } = storeToRefs(store);
  const { fetchProducts } = store;
  const { addItem } = useCartStore();

  const isLoading = ref(true);

  const addToCart = (product: Product) => {
    addItem(product);
  };

  const handleFetchProducts = async () => {
    isLoading.value = true;

    try {
      if (!products.value?.length) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(handleFetchProducts);
</script>
