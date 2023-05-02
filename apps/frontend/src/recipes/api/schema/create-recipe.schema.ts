import { z } from 'zod';
import { validationMessages } from '@fe/utils';
import { Id, IngredientId } from '@lib/shared';

export const CreateRecipeFormSchema = z.object({
  name: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required),
  description: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required),
  portions: z
    .number({ required_error: validationMessages.required })
    .positive(validationMessages.positive)
    .int(validationMessages.positive),
  ingredients: z
    .array(
      z.object({
        id: z
          .string({ required_error: validationMessages.required })
          .nonempty(validationMessages.required)
          .transform((id) => Id<IngredientId>(id)),
        quantity: z
          .number({ required_error: validationMessages.required })
          .positive(validationMessages.positive),
        unit: z
          .string({ required_error: validationMessages.required })
          .nonempty(validationMessages.required),
      }),
      { required_error: 'Dodaj conajmniej jeden składnik' }
    )
    .nonempty('Dodaj conajmniej jeden składnik'),
  preparationTime: z
    .number({ required_error: validationMessages.required })
    .positive(validationMessages.positive)
    .int(validationMessages.positive)
    .transform((min) => min * 60),
  instructions: z
    .array(
      z.object({
        step: z
          .string({ required_error: validationMessages.required })
          .nonempty(validationMessages.required),
      })
    )
    .nonempty(validationMessages.required),
});

export type CreateRecipeFormValues = z.infer<typeof CreateRecipeFormSchema>;
