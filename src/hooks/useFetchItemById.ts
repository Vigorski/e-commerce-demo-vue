import { ref } from 'vue';
import { useFetch } from '@/hooks/useFetch';
import { useToast } from 'vue-toastification';

const firebaseUrl = import.meta.env.VITE_FIREBASE_REALTIME_DATABASE;

export function useFetchItemById<T>() {
  const product = ref<T>();
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
	const toast = useToast();

  const fetchItemById = async (path: string, id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await useFetch<T>(`${firebaseUrl}/${path}/${id}.json`);

      if (!result) throw new Error(`Item from ${path} not found`);

      product.value = result;
    } catch (err) {
      error.value = err as Error;
      toast.error(`Failed to fetch item from ${path}.`);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    product,
    isLoading,
    error,
    fetchItemById,
  };
}