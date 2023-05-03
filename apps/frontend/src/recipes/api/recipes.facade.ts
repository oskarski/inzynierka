import { useRecipesApi } from './RecipesApi.context';
import {
  PaginationSelector,
  useAdaptedMutation,
  useAdaptedQuery,
  usePaginatedQuery,
} from '@fe/utils';
import { IRecipeDto, IRecipeListItemDto, RecipeId } from '@lib/shared';
import { RecipeDetailsSelector, RecipeListItemSelector } from './selectors';
import { IRecipe, IRecipeListItem } from './types';
import { useListAllRecipesCategories } from '@fe/recipes-categories';
import { useCallback } from 'react';
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

export const ListPaginatedRecipesQueryKey = [
  'recipesApi',
  'listRecipesPaginated',
];

export const GetRecipeDetailsQueryKey = (id: RecipeId) => [
  'recipesApi',
  'getRecipeDetails',
  id,
];

export const useCreateRecipe = ({
  onSuccess,
}: {
  onSuccess?: (recipeId: RecipeId) => void;
} = {}) => {
  const queryClient = useQueryClient();

  const { recipesApi } = useRecipesApi();

  return useAdaptedMutation<
    RecipeId,
    CreateRecipeFormValues,
    FormValidationOrApiError
  >(
    (formValues) =>
      CreateRecipeFormSchema.parseAsync(formValues)
        .then((dto) => recipesApi.createRecipe(dto))
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

  const { recipesApi } = useRecipesApi();

  return useAdaptedMutation<
    RecipeId,
    PublishRecipeFormValues,
    FormValidationOrApiError
  >(
    async (formValues) =>
      PublishRecipeFormSchema.parseAsync(formValues)
        .then((dto) =>
          recipesApi.createAndPublishRecipe({ ...dto, categoryIds: [] })
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

export const useListPaginatedRecipes = () => {
  const { recipesApi } = useRecipesApi();

  return usePaginatedQuery<IRecipeListItemDto, IRecipeListItem>(
    ListPaginatedRecipesQueryKey,
    ({ pageParam = 0 }) =>
      recipesApi.listRecipesPaginated({ page: pageParam, perPage: 20 }),
    20,
    {
      select: PaginationSelector(RecipeListItemSelector),
    }
  );
};

export const useConnectedCategories = () => {
  const [categories] = useListAllRecipesCategories();

  return useCallback(
    (recipe: IRecipeListItem | IRecipe) => {
      if (!categories) return [];

      const recipeCategories = [];

      for (const categoryId of recipe.categoryIds) {
        const category = categories.find(
          (category) => category.id === categoryId
        );

        if (category) recipeCategories.push(category);
      }

      return recipeCategories;
    },
    [categories]
  );
};

export const useRecipeDetails = (id: RecipeId) => {
  const { recipesApi } = useRecipesApi();

  return useAdaptedQuery<IRecipeDto, IRecipe>(
    GetRecipeDetailsQueryKey(id),
    () => recipesApi.getRecipeDetails(id),
    {
      select: RecipeDetailsSelector,
    }
  );
};
