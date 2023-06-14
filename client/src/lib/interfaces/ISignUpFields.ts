import { z } from 'zod';
import getSignupSchema from '../validations/signUpSchema';

export type ISignUpFields = z.infer<ReturnType<typeof getSignupSchema>>;
