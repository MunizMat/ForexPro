import { useState } from 'react';
import getValidationErrors from '../utils/getValidationErrors';
import { IDictionary } from '../interfaces/IDictionary';
import { ZodEffects, ZodObject, ZodTypeAny } from 'zod';

export default function useFormValidation<TFormData>(
  dict: IDictionary,
  zodSchemaGetter: (
    // eslint-disable-next-line
    dict: IDictionary
  ) =>
    | ZodObject<Record<keyof TFormData, ZodTypeAny>>
    | ZodEffects<ZodObject<Record<keyof TFormData, ZodTypeAny>>>
) {
  const [errors, setErrors] = useState<Partial<TFormData>>({});

  const validateForm = (formFields: TFormData) => {
    const validationResult = zodSchemaGetter(dict).safeParse(formFields);
    if (validationResult.success) return validationResult.success;

    const fieldErrors = getValidationErrors(
      validationResult.error.errors
    ) as unknown as Partial<TFormData>;
    setErrors(fieldErrors);

    return validationResult.success;
  };

  return { errors, validateForm };
}
