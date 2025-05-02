import { reactive } from 'vue';
import type {
  FormField,
  FormFields,
  ValidationSchema,
} from '@/customTypes/form';

export function useFormFields<T extends string>(
  fieldNames: T[],
  validationSchema: ValidationSchema<T>
) {
  const fields: FormFields = {};

  for (const name of fieldNames) {
    fields[name] = reactive<FormField>({
      val: '',
      error: '',
    });
  }

  const resetFormErrors = () => {
    for (const name of fieldNames) {
      fields[name].error = '';
    }
  };

  const validateForm = () => {
    resetFormErrors();
    let valid = true;

    for (const name of fieldNames) {
      const rules = validationSchema[name];

      for (const rule of rules) {
        const error = rule(fields[name].val, fields);

        if (error) {
          fields[name].error = error;
          valid = false;
          break;
        }
      }
    }

    return valid;
  };

  return {
    fields,
    resetFormErrors,
    validateForm,
  };
}
