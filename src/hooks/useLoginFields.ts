import { useFormFields } from '@/hooks/useFormFields';

export const useLoginFields = () => {
  const { fields, validateForm, resetFormErrors } = useFormFields(
    ['email', 'password'],
    {
      email: [
        (val) => !val && 'Email is required.',
        (val) =>
          !val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && 'Invalid email address.',
      ],
      password: [
        (val) => !val && 'Password is required.',
        (val) => val.length < 6 && 'Password must be at least 6 characters.',
      ],
    }
  );

  return {
    fields,
    resetFormErrors,
    validateForm,
  };
};
