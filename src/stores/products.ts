import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFetch } from '../hooks/useFetch';
import type { Product } from '@/customTypes/product';

const firebaseUrl = import.meta.env.VITE_FIREBASE_REALTIME_DATABASE;

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await useFetch<{ [key: string]: Product }, Product>(
        `${firebaseUrl}/products.json`
      );

      products.value = Object.entries(response).map(([id, value]) => ({
        ...value,
        id,
      }));
    } catch (error) {
      throw error;
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const response = await useFetch<{ name: string }, Product>(
        `${firebaseUrl}/products.json`,
        {
          method: 'POST',
          body: product,
        }
      );
      products.value.push({ ...product, id: response.name });
    } catch (error) {
      throw error;
    }
  };

  return { products, fetchProducts, addProduct };
});
