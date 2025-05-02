import { useFormFields } from '@/hooks/useFormFields';

export const useAddProductFields = () => {
  const { fields, validateForm, resetFormErrors } = useFormFields(
    ['title', 'description', 'price'],
    {
      title: [(val) => !val && 'Title is required.'],
      description: [(val) => !val && 'Description is required.'],
      price: [
        (val) => !val && 'Price is required.',
        (val) => Number(val) < 0 && 'Price must be a positive number.',
      ],
    }
  );

  return {
    fields,
    resetFormErrors,
    validateForm,
  };
};
