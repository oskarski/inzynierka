import { z } from 'zod';
import { validationMessages } from '@fe/utils';

export const SignInFormSchema = z.object({
  email: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .email(validationMessages.notAnEmail),
  password: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required),
});
