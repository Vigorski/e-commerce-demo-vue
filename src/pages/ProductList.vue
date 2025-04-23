<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="max-w-7xl mx-auto px-4 py-10">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Shop Our Products
      </h1>

      <div
        class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
        >
          <div
            class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden"
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
              <span class="text-blue-600 font-bold text-lg">
                ${{ product.price.toFixed(2) }}
              </span>
              <button
                @click="addToCart(product)"
                class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import Navbar from '@/components/NavBar.vue';
  import { useProductStore } from '@/stores/products';
  import type { Product } from '@/customTypes/product';
  import { storeToRefs } from 'pinia';

  const store = useProductStore();
  const { products } = storeToRefs(store);
  const { fetchProducts } = store;
  const { addItem } = useCartStore();

  const addToCart = (product: Product) => {
    addItem(product);
  };

  onMounted(async () => {
    try {
      await fetchProducts();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  });
</script>
