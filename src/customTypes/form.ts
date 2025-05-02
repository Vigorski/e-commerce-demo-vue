export type FormField = {
  val: string;
  error: string;
};

export type FormFields = Record<string, FormField>;

type ValidationRule<T = string> = (value: T, fields?: FormFields) => T | false;

export type ValidationSchema<T extends string> = Record<T, ValidationRule[]>;
