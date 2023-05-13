import { z } from 'zod';
import { validationMessages } from '@fe/utils';
import {
  Id,
  IngredientId,
  RecipeCategoryId,
  RecipeDifficulty,
} from '@lib/shared';

export const CreateRecipeFormSchema = z.object({
  name: z
    .string({ required_error: validationMessages.required })
    .nonempty(validationMessages.required),
  description: z.string().optional(),
  difficulty: z
    .enum([
      RecipeDifficulty.easy,
      RecipeDifficulty.medium,
      RecipeDifficulty.difficult,
    ])
    .optional(),
  dietType: z
    .array(
      z
        .string({ required_error: validationMessages.required })
        .nonempty(validationMessages.required)
        .transform((id) => Id<RecipeCategoryId>(id))
    )
    .optional(),
  portions: z
    .number()
    .positive(validationMessages.positive)
    .int(validationMessages.positive)
    .optional(),
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
      })
    )
    .optional(),
  preparationTime: z
    .number()
    .positive(validationMessages.positive)
    .int(validationMessages.positive)
    .transform((min) => (min === undefined ? undefined : min * 60))
    .optional(),
  instructions: z
    .array(
      z.object({
        step: z.string().optional(),
      })
    )
    .optional(),
});

export type CreateRecipeFormValues = z.infer<typeof CreateRecipeFormSchema>;
