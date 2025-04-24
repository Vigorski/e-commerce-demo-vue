import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useFetch } from '@/hooks/useFetch';
import type { Product } from '@/customTypes/product';

const firebaseUrl = import.meta.env.VITE_FIREBASE_REALTIME_DATABASE;
const toast = useToast();

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const errors = ref<{ [key: string]: Error }>();

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
			errors.value = { ...errors.value, fetchProducts: error as Error };
			toast.error('Failed to fetch products.');
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
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add new product.');
			errors.value = { ...errors.value, addProduct: error as Error };
      throw error;
    }
  };

  return { products, fetchProducts, addProduct, errors };
});
