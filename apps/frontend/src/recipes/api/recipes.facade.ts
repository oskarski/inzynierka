import { useRecipesApi } from './RecipesApi.context';
import {
  ListSelector,
  PaginationSelector,
  useAdaptedMutation,
  useAdaptedQuery,
  usePaginatedQuery,
} from '@fe/utils';
import {
  ICreateRecipeDto,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { RecipeDetailsSelector, RecipeListItemSelector } from './selectors';
import { IRecipe, IRecipeListItem } from './types';
import { useListAllRecipesCategories } from '@fe/recipes-categories';
import { useCallback } from 'react';
import {
  ApiError,
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { useQueryClient } from 'react-query';
import { ISignedInUserDto, ISignInDto, SignedInUserQueryKey } from '@fe/iam';
import { SignInFormSchema } from '@fe/iam/api/schema/sign-in.schema';
import { CreateRecipeFormSchema } from '@fe/recipes/api/schema/create-recipe.schema';

export const ListPaginatedRecipesQueryKey = [
  'recipesApi',
  'listRecipesPaginated',
];

export const GetRecipeDetailsQueryKey = (id: RecipeId) => [
  'recipesApi',
  'getRecipeDetails',
  id,
];

export const ListFavouriteRecipesQueryKey = [
  'recipesApi',
  'listFavouriteRecipes',
];

export const useCreateRecipe = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const { recipesApi } = useRecipesApi();

  return useAdaptedMutation<
    RecipeId,
    ICreateRecipeDto,
    FormValidationOrApiError
  >(
    (formValues) =>
      CreateRecipeFormSchema.parseAsync(formValues)
        .then((dto) => recipesApi.createRecipe({ ...dto, categoryIds: [] }))
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

export const useAddRecipeToFavourites = (id: RecipeId) => {
  const queryClient = useQueryClient();

  const { recipesApi } = useRecipesApi();

  return useAdaptedMutation<void, void, ApiError>(
    () => recipesApi.addRecipeToFavorites(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(ListFavouriteRecipesQueryKey),
    }
  );
};

export const useListFavouriteRecipes = () => {
  const { recipesApi } = useRecipesApi();

  return useAdaptedQuery<IRecipeListItemDto[], IRecipeListItem[]>(
    ListFavouriteRecipesQueryKey,
    () => recipesApi.listFavouriteRecipes(),
    {
      select: ListSelector(RecipeListItemSelector),
    }
  );
};

export const useRemoveRecipeFromFavourites = (id: RecipeId) => {
  const queryClient = useQueryClient();

  const { recipesApi } = useRecipesApi();

  return useAdaptedMutation<void, void>(
    () => recipesApi.removeRecipeFromFavorites(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(ListFavouriteRecipesQueryKey),
    }
  );
};
