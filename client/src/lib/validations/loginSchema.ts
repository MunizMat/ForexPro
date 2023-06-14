import { z } from 'zod';
import { IDictionary } from '../interfaces/IDictionary';

export default function getLoginSchema(dict: IDictionary) {
  const loginSchema = z.object({
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
  });

  return loginSchema;
}
