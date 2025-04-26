<template>
  <BaseCard customClasses="p-4 mb-8 border border-gray-100">
    <div class="flex flex-wrap items-center gap-6">
      <BaseSelect
        inline
        name="sort"
        v-model="filters.sortBy"
        labelText="Sort by:"
        :options="[
          { value: ProductSortBy.PRICE_ASC, label: 'Lowest firsty' },
          { value: ProductSortBy.PRICE_DESC, label: 'Highest first' },
          { value: ProductSortBy.LATEST, label: 'Latest' },
        ]"
      />
      <BaseCheckbox
        name="isOnSale"
        v-model="filters.isOnSale"
        labelText="On sale"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
  import BaseCheckbox from '@/components/form/BaseCheckbox.vue';
  import BaseSelect from '@/components/form/BaseSelect.vue';
  import { ProductSortBy } from '@/customTypes/product';
  import BaseCard from '@/components/UI/BaseCard.vue';
  import { useProductStore } from '@/stores/products';
  import { storeToRefs } from 'pinia';

  const store = useProductStore();
  const { filters } = storeToRefs(store);
</script>
