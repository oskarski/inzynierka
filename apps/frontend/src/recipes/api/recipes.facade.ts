import { useRecipesApi } from './RecipesApi.context';
import {
  PaginationSelector,
  useAdaptedQuery,
  usePaginatedQuery,
} from '@fe/utils';
import { IRecipeDto, IRecipeListItemDto, RecipeId } from '@lib/shared';
import { RecipeDetailsSelector, RecipeListItemSelector } from './selectors';
import { IRecipe, IRecipeListItem } from './types';
import { useListAllRecipesCategories } from '@fe/recipes-categories';
import { useCallback } from 'react';

export const ListPaginatedRecipesQueryKey = [
  'recipesApi',
  'listRecipesPaginated',
];

export const GetRecipeDetailsQueryKey = (id: RecipeId) => [
  'recipesApi',
  'getRecipeDetails',
  id,
];

export const useListPaginatedRecipes = () => {
  const { recipesApi } = useRecipesApi();

  return usePaginatedQuery<IRecipeListItemDto, IRecipeListItem>(
    ListPaginatedRecipesQueryKey,
    ({ pageParam = 0 }) =>
      recipesApi.listRecipesPaginated({
        page: pageParam,
        perPage: 20,
        ingredients: [],
      }),
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
