<template>
  <section>
    <PageTitle>Add New Product</PageTitle>

    <BaseCard customClasses="shadow-lg p-8 max-w-2xl mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          v-model.trim="title.val"
          name="title"
          labelText="Product Title"
          :error="title.error"
        >
          <template #icon>
            <DocumentTextIcon class="h-5 w-5 text-gray-400" />
          </template>
        </BaseInput>

        <BaseTextarea
          v-model.trim="description.val"
          name="description"
          labelText="Product Description"
          :error="description.error"
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
            v-model="price.val"
            name="price"
            labelText="Product Price"
            mode="number"
            step=".01"
            min="0"
            :error="price.error"
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
  import { useAddProductFields } from '@/hooks/useAddProductFields';

  const router = useRouter();
  const { addProduct } = useProductStore();
  const { fields, validateForm } = useAddProductFields();

  const { title, description, price } = fields;
  const image = ref('');
  const isOnSale = ref(false);
  const salePrice = ref('');

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newProduct: NewProduct = {
      title: title.val,
      description: description.val,
      price: Number(price.val),
      image: image.value,
      isOnSale: isOnSale.value,
      createdAt: Date.now(),
    };

    if (isOnSale.value) {
      newProduct.salePrice = Number(salePrice.value);
    }

    try {
      await addProduct(newProduct);

      title.val = '';
      description.val = '';
      price.val = '';
      image.value = '';
      isOnSale.value = false;
      salePrice.value = '';

      router.push({ name: routeName.PRODUCT_LIST });
    } catch (error) {
      console.error('Failed to add new product:', error);
    }
  };
</script>
