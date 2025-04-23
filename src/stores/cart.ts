import type { CartItem } from '@/customTypes/cart';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    const existing = items.value.find((item) => item.id === product.id);
    if (existing) existing.quantity += 1;
    else items.value.push({ ...product, quantity: 1 });
  };

  const removeItem = (id: string) => {
    items.value = items.value.filter((i) => i.id !== id);
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    clearCart,
  };
});
