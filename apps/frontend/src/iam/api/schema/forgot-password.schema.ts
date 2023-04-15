import { z } from 'zod';
import { validationMessages } from '@fe/utils';

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .email(validationMessages.notAnEmail),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
