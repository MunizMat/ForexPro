import { z } from 'zod';

export default z.object({
  name: z.string().nonempty({ message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password must contain at least one capital letter and one number',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must not exceed 30 characters' }),
});
