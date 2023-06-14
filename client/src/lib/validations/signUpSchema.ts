import { z } from 'zod';
import { IDictionary } from '../interfaces/IDictionary';

export default function getSignupSchema(dict: IDictionary) {
  const signUpSchema = z
    .object({
      name: z.string().nonempty({ message: dict.validations.name }),
      email: z
        .string()
        .nonempty({ message: dict.validations.email.required })
        .email({ message: dict.validations.email.invalid }),
      password: z
        .string()
        .nonempty({ message: dict.validations.password.required })
        .min(6, { message: dict.validations.password.tooShort })
        .max(30, { message: dict.validations.password.tooLong })
        .regex(/^(?=.*[A-Z])(?=.*\d).*$/, {
          message: dict.validations.password.invalid,
        }),
      passwordConfirmation: z
        .string()
        .nonempty({ message: dict.validations.passwordConfirmation.required }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: dict.validations.passwordConfirmation.notMatching,
      path: ['passwordConfirmation'],
    });

  return signUpSchema;
}
