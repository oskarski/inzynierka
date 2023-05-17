import { useRecipesApi } from './RecipesApi.context';
import { ListSelector, useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import { RecipeId } from '@lib/shared';
import {
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { useQueryClient } from 'react-query';
import {
  DraftRecipeFormSchema,
  DraftRecipeFormValues,
} from './schema/draft-recipe.schema';
import {
  PublishRecipeFormSchema,
  PublishRecipeFormValues,
} from './schema/publish-recipe.schema';
import { RecipeListItemSelector } from './selectors';
import { GetRecipeDetailsQueryKey } from './recipes.facade';

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
    DraftRecipeFormValues,
    FormValidationOrApiError
  >(
    (formValues) =>
      DraftRecipeFormSchema.parseAsync(formValues)
        .then((dto) => myRecipesApi.createRecipe(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (recipeId) => {
        queryClient.invalidateQueries(ListMyRecipesQueryKey);
        queryClient.invalidateQueries(GetRecipeDetailsQueryKey(recipeId));

        if (onSuccess) onSuccess(recipeId);
      },
    }
  );
};

export const useCreateAndPublishRecipe = ({
  onSuccess,
}: { onSuccess?: (recipeId: RecipeId) => void } = {}) => {
  const queryClient = useQueryClient();

  const { myRecipesApi } = useRecipesApi();

  return useAdaptedMutation<
    RecipeId,
    PublishRecipeFormValues,
    FormValidationOrApiError
  >(
    async (formValues) =>
      PublishRecipeFormSchema.parseAsync(formValues)
        .then((dto) => myRecipesApi.createAndPublishRecipe(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (recipeId) => {
        queryClient.invalidateQueries(ListMyRecipesQueryKey);
        queryClient.invalidateQueries(GetRecipeDetailsQueryKey(recipeId));

        if (onSuccess) onSuccess(recipeId);
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

export const usePublishRecipe = (
  recipeId: RecipeId,
  { onSuccess }: { onSuccess?: () => void } = {}
) => {
  const queryClient = useQueryClient();

  const { myRecipesApi } = useRecipesApi();

  return useAdaptedMutation<
    void,
    PublishRecipeFormValues,
    FormValidationOrApiError
  >(
    async (formValues) =>
      PublishRecipeFormSchema.parseAsync(formValues)
        .then((dto) => myRecipesApi.publishRecipe(recipeId, dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ListMyRecipesQueryKey);
        queryClient.invalidateQueries(GetRecipeDetailsQueryKey(recipeId));

        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useUnpublishRecipe = (
  recipeId: RecipeId,
  { onSuccess }: { onSuccess?: () => void } = {}
) => {
  const queryClient = useQueryClient();

  const { myRecipesApi } = useRecipesApi();

  return useAdaptedMutation<
    void,
    PublishRecipeFormValues,
    FormValidationOrApiError
  >(
    async (formValues) =>
      DraftRecipeFormSchema.parseAsync(formValues)
        .then((dto) => myRecipesApi.unpublishRecipe(recipeId, dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ListMyRecipesQueryKey);
        queryClient.invalidateQueries(GetRecipeDetailsQueryKey(recipeId));

        if (onSuccess) onSuccess();
      },
    }
  );
};
