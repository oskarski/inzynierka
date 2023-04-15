import { z } from 'zod';
import { validationMessages } from '@fe/utils';

export const ConfirmForgotPasswordFormSchema = z.object({
  code: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .length(6, validationMessages.length(6, 'Kod')),
  password: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .min(8, validationMessages.minLength(8, 'Hasło'))
    .regex(/[a-z]/, validationMessages.mustContainLowerCaseLetter('Hasło'))
    .regex(/[A-Z]/, validationMessages.mustContainUpperCaseLetter('Hasło'))
    .regex(/\d/, validationMessages.mustContainDigit('Hasło')),
});
