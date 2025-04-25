<template>
  <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
    Add New Product
  </h1>

  <BaseCard customClasses="shadow-lg p-8">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <BaseInput v-model.trim="title" name="title" labelText="Product Title">
        <template #icon>
          <DocumentTextIcon class="h-5 w-5 text-gray-400" />
        </template>
      </BaseInput>

      <BaseTextarea
        v-model.trim="description"
        name="description"
        labelText="Product Description"
      >
        <template #icon>
          <ChatBubbleLeftRightIcon class="h-5 w-5 text-gray-400" />
        </template>
      </BaseTextarea>

      <BaseInput
        v-model="price"
        name="price"
        labelText="Product Price"
        mode="number"
        step=".01"
        min="0"
      >
        <template #icon>
          <CurrencyDollarIcon class="h-5 w-5 text-gray-400" />
        </template>
      </BaseInput>

      <BaseInput v-model.trim="image" name="image" labelText="Image URL">
        <template #icon>
          <PhotoIcon class="h-5 w-5 text-gray-400" />
        </template>
      </BaseInput>

      <BaseCheckbox name="isOnSale" v-model="isOnSale" labelText="On Sale" />

      <BaseInput
        v-model.trim="salePrice"
        name="salePrice"
        labelText="Sale Price"
        v-if="isOnSale"
      >
        <template #icon>
          <CurrencyDollarIcon class="h-5 w-5 text-gray-400" />
        </template>
      </BaseInput>

      <BaseButton mode="submit" customClasses="w-full">
        Add New Product
      </BaseButton>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '@/stores/products';
  import BaseCard from '@/components/UI/formUI/BaseCard.vue';
  import BaseButton from '@/components/UI/formUI/BaseButton.vue';
  import BaseInput from '@/components/UI/formUI/BaseInput.vue';
  import BaseTextarea from '@/components/UI/formUI/BaseTextarea.vue';
  import {
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    CurrencyDollarIcon,
    PhotoIcon,
  } from '@heroicons/vue/24/outline';
  import BaseCheckbox from '@/components/UI/formUI/BaseCheckbox.vue';
  import type { Product } from '@/customTypes/product';

  const router = useRouter();
  const { addProduct } = useProductStore();
  const title = ref('');
  const description = ref('');
  const price = ref('');
  const image = ref('');
  const isOnSale = ref(false);
  const salePrice = ref('');

  const handleSubmit = async () => {
    if (!title.value || !description.value || !price.value) {
      console.error('Input validation failed!');
      return;
    }

    const newProduct: Product = {
      title: title.value,
      description: description.value,
      price: Number(price.value),
      image: image.value,
      isOnSale: isOnSale.value,
      createdAt: Date.now(),
    };

    if (isOnSale.value) {
      newProduct.salePrice = Number(salePrice.value);
    }

    try {
      await addProduct(newProduct);

      title.value = '';
      description.value = '';
      price.value = '';
      image.value = '';
      isOnSale.value = false;
      salePrice.value = '';

      router.push({ name: 'ProductList' });
    } catch (error) {
      console.error('Failed to add new product:', error);
    }
  };
</script>
