<template>
  <section>
    <PageTitle>Add New Product</PageTitle>

    <BaseCard customClasses="shadow-lg p-8 max-w-2xl mx-auto">
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

        <div class="grid grid-cols-1 content-center sm:grid-cols-2 gap-4">
          <BaseInput v-model.trim="image" name="image" labelText="Image URL">
            <template #icon>
              <PhotoIcon class="h-5 w-5 text-gray-400" />
            </template>
          </BaseInput>

          <BaseCheckbox
            name="isOnSale"
            v-model="isOnSale"
            labelText="On Sale"
          />
        </div>
        <div class="grid grid-cols-1 content-center sm:grid-cols-2 gap-4">
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
        </div>

        <BaseButton mode="submit" customClasses="w-full">
          Add New Product
        </BaseButton>
      </form>
    </BaseCard>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '@/stores/products';
  import BaseCard from '@/components/UI/BaseCard.vue';
  import BaseButton from '@/components/form/BaseButton.vue';
  import BaseInput from '@/components/form/BaseInput.vue';
  import BaseTextarea from '@/components/form/BaseTextarea.vue';
  import BaseCheckbox from '@/components/form/BaseCheckbox.vue';
  import {
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
    CurrencyDollarIcon,
    PhotoIcon,
  } from '@heroicons/vue/24/outline';
  import type { NewProduct } from '@/customTypes/product';
  import PageTitle from '@/components/UI/PageTitle.vue';
  import { routeName } from '@/router/routes';

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

    const newProduct: NewProduct = {
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

      router.push({ name: routeName.PRODUCT_LIST });
    } catch (error) {
      console.error('Failed to add new product:', error);
    }
  };
</script>
