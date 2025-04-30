import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useFetch } from '@/hooks/useFetch';
import {
  ProductSortBy,
  type NewProduct,
  type Product,
} from '@/customTypes/product';
import { getErrorMessage } from '@/utilities/errorMessage';

const firebaseUrl = import.meta.env.VITE_FIREBASE_REALTIME_DATABASE;
const toast = useToast();

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const filters = ref({
    isOnSale: false,
    sortBy: ProductSortBy.PRICE_ASC,
  });
  const errors = ref<{ [key: string]: Error }>();

  const fetchProducts = async () => {
    try {
      const response = await useFetch<{ [key: string]: Product }>(
        `${firebaseUrl}/products.json`
      );

      products.value =
        response &&
        Object.entries(response).map(([id, value]) => ({
          ...value,
          id,
        }));
    } catch (error) {
      errors.value = { ...errors.value, fetchProducts: error as Error };
      toast.error(getErrorMessage(error, 'Failed to fetch products.'));
      throw error;
    }
  };

  const filteredProducts = computed(() => {
    let result: Product[] = [...(products.value ?? [])];

    if (filters.value.isOnSale) {
      result = result.filter((p) => p.isOnSale);
    }

    switch (Number(filters.value.sortBy)) {
      case ProductSortBy.PRICE_ASC:
        result.sort((a, b) => a.price - b.price);
        break;
      case ProductSortBy.PRICE_DESC:
        result.sort((a, b) => b.price - a.price);
        break;
      case ProductSortBy.LATEST:
      default:
        console.log(
          result,
          result[0].createdAt,
          result[result.length - 1].createdAt
        );
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    return result;
  });

  const addProduct = async (product: NewProduct) => {
    try {
      const response = await useFetch<
        { name: string; error?: string },
        NewProduct
      >(`${firebaseUrl}/products.json`, {
        method: 'POST',
        body: product,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      products.value.push({ ...product, id: response.name });
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to add new product.'));
      errors.value = { ...errors.value, addProduct: error as Error };
      throw error;
    }
  };

  return {
    products,
    fetchProducts,
    addProduct,
    errors,
    filteredProducts,
    filters,
  };
});
