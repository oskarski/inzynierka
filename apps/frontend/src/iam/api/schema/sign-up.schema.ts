import { z } from 'zod';
import { validationMessages } from '@fe/utils';

export const SignUpFormSchema = z.object({
  email: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .email(validationMessages.notAnEmail),
  password: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .min(8, validationMessages.minLength(8, 'Hasło'))
    .regex(/[a-z]/, validationMessages.mustContainLowerCaseLetter('Hasło'))
    .regex(/[A-Z]/, validationMessages.mustContainUpperCaseLetter('Hasło'))
    .regex(/\d/, validationMessages.mustContainDigit('Hasło')),
  firstName: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required),
  lastName: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required),
});
