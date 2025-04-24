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

			<BaseTextarea v-model.trim="description" name="description" labelText="Product Description">
				<template #icon>
					<ChatBubbleLeftRightIcon class="h-5 w-5 text-gray-400" />
				</template>
			</BaseTextarea>

			<BaseInput v-model="price" name="price" labelText="Product Price" mode="number" step=".01" min="0">
				<template #icon>
					<CurrencyDollarIcon class="h-5 w-5 text-gray-400" />
				</template>
			</BaseInput>

			<BaseInput v-model.trim="image" name="image" labelText="Image URL">
				<template #icon>
					<PhotoIcon class="h-5 w-5 text-gray-400" />
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
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseTextarea from '@/components/UI/BaseTextarea.vue';
import {
	DocumentTextIcon,
	ChatBubbleLeftRightIcon,
	CurrencyDollarIcon,
	PhotoIcon,
} from '@heroicons/vue/24/outline';

const router = useRouter();
const { addProduct } = useProductStore();
const title = ref('');
const description = ref('');
const price = ref('');
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
			price: Number(price.value),
			image: image.value,
		});

		title.value = '';
		description.value = '';
		price.value = '';
		image.value = '';

		router.push({ name: 'ProductList' });
	} catch (error) {
		console.error('Failed to add new product:', error);
	}
};
</script>
