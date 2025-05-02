import { useFormFields } from '@/hooks/useFormFields';

export const useRegisterFields = () => {
  const { fields, validateForm, resetFormErrors } = useFormFields(
    ['firstName', 'lastName', 'email', 'password', 'confirmPassword'],
    {
      firstName: [(val) => !val && 'First name is required.'],
      lastName: [(val) => !val && 'Last name is required.'],
      email: [
        (val) => !val && 'Email is required.',
        (val) =>
          !val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && 'Invalid email address.',
      ],
      password: [
        (val) => !val && 'Password is required.',
        (val) => val.length < 6 && 'Password must be at least 6 characters.',
      ],
      confirmPassword: [
        (val, fields) =>
          val !== fields?.password.val && 'Passwords do not match.',
      ],
    }
  );

  return {
    fields,
    resetFormErrors,
    validateForm,
  };
};
