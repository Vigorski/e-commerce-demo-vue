<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Add Product</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input
        v-model.trim="title"
        type="text"
        placeholder="Product Title"
        class="border p-2 w-full rounded"
      />
      <input
        v-model.trim="description"
        type="text"
        placeholder="Product Description"
        class="border p-2 w-full rounded"
      />
      <input
        v-model.trim="price"
        type="number"
        step=".01"
        placeholder="Price"
        class="border p-2 w-full rounded"
      />
      <input
        v-model="image"
        type="text"
        placeholder="Image URL"
        class="border p-2 w-full rounded"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
      >
        Add new product
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { useProductStore } from '@/stores/products';
  import { ref } from 'vue';

  const { addProduct } = useProductStore();
  const title = ref('');
  const description = ref('');
  const price = ref<number | null>(null);
  const image = ref('');

  const handleSubmit = async () => {
    if (!title.value || !description.value || !price.value) {
      console.error('Input validation failed!');
      return;
    }

    try {
      await addProduct({
        title: title.value,
        description: description.value,
        price: price.value,
        image: image.value,
      });

      title.value = '';
      description.value = '';
      price.value = null;
      image.value = '';
    } catch (error) {
      console.error('Failed to add new product:', error);
    }
  };
</script>
