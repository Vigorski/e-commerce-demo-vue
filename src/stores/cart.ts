import type { CartItem } from '@/customTypes/cart';
import type { Product } from '@/customTypes/product';
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);

  const loadCart = () => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      cartItems.value = JSON.parse(storedCart);
    }
  };

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  };

  const totalPrice = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
      0
    )
  );

  const itemCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const addItem = (product: Product) => {
    const existing = cartItems.value.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
    toast.success('Cart updated!');
  };

  const removeItem = (productId: string) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  };

  const clearCart = () => {
    cartItems.value = [];
    toast.info('Cart cleared.');
  };

  watch(cartItems, saveCart, { deep: true });

  loadCart();

  return {
    cartItems,
    totalPrice,
    itemCount,
    addItem,
    removeItem,
    clearCart,
  };
});
