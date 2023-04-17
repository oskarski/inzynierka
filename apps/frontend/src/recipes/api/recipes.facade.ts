import { useRecipesApi } from './RecipesApi.context';
import { PaginationSelector, usePaginatedQuery } from '@fe/utils';
import { IRecipeListItemDto } from '@lib/shared';
import { RecipeListItemSelector } from './selectors';
import { IRecipeListItem } from './types';
import { useListAllRecipesCategories } from '@fe/recipes-categories';
import { useCallback } from 'react';

export const useListPaginatedRecipes = () => {
  const { recipesApi } = useRecipesApi();

  return usePaginatedQuery<IRecipeListItemDto, IRecipeListItem>(
    ['recipesApi', 'listPaginatedRecipes'],
    ({ pageParam = 0 }) =>
      recipesApi.listPaginatedRecipes({ page: pageParam, perPage: 20 }),
    20,
    {
      select: PaginationSelector(RecipeListItemSelector),
    }
  );
};

export const useConnectedCategories = () => {
  const [categories] = useListAllRecipesCategories();

  return useCallback(
    (recipe: IRecipeListItem) => {
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
