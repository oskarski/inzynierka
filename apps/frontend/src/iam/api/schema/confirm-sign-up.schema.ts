import { z } from 'zod';
import { validationMessages } from '@fe/utils';

export const ConfirmSignUpFormSchema = z.object({
  code: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required)
    .length(6, validationMessages.length(6, 'Kod')),
});
