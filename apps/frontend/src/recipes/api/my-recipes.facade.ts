import { useRecipesApi } from './RecipesApi.context';
import { ListSelector, useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import { RecipeId } from '@lib/shared';
import {
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { useQueryClient } from 'react-query';
import {
  CreateRecipeFormSchema,
  CreateRecipeFormValues,
} from './schema/create-recipe.schema';
import {
  PublishRecipeFormSchema,
  PublishRecipeFormValues,
} from './schema/publish-recipe.schema';
import { RecipeListItemSelector } from '@fe/recipes/api/selectors';

export const ListMyRecipesQueryKey = ['myRecipesApi.listMyRecipes'];

export const useCreateRecipe = ({
  onSuccess,
}: {
  onSuccess?: (recipeId: RecipeId) => void;
} = {}) => {
  const queryClient = useQueryClient();

  const { myRecipesApi } = useRecipesApi();

  return useAdaptedMutation<
    RecipeId,
    CreateRecipeFormValues,
    FormValidationOrApiError
  >(
    (formValues) =>
      CreateRecipeFormSchema.parseAsync(formValues)
        .then((dto) => myRecipesApi.createRecipe(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (recipeId, d) => {
        // TODO reset my recipes list

        if (onSuccess) onSuccess(recipeId);
      },
    }
  );
};

export const useCreateAndPublishRecipe = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const { myRecipesApi } = useRecipesApi();

  return useAdaptedMutation<
    RecipeId,
    PublishRecipeFormValues,
    FormValidationOrApiError
  >(
    async (formValues) =>
      PublishRecipeFormSchema.parseAsync(formValues)
        .then((dto) =>
          myRecipesApi.createAndPublishRecipe({ ...dto, categoryIds: [] })
        )
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: () => {
        // TODO reset my recipes list

        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useListMyRecipes = () => {
  const { myRecipesApi } = useRecipesApi();

  return useAdaptedQuery(
    ListMyRecipesQueryKey,
    () => myRecipesApi.listMyRecipes(),
    { select: ListSelector(RecipeListItemSelector) }
  );
};