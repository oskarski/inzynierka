import { useRecipesApi } from './RecipesApi.context';
import {
  ListSelector,
  PaginationSelector,
  useAdaptedQuery,
  usePaginatedQuery,
} from '@fe/utils';
import {
  IListRecipesQueryDto,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { RecipeDetailsSelector, RecipeListItemSelector } from './selectors';
import { IRecipe, IRecipeListItem } from './types';
import { useListCategories } from '@fe/recipes-categories';
import { useCallback } from 'react';

export const ListPaginatedRecipesQueryKey = (
  queryDto: IListRecipesQueryDto | undefined
) => {
  const queryKey: any[] = ['recipesApi', 'listRecipesPaginated'];

  if (queryDto) queryKey.push(queryDto);

  return queryKey;
};

export const ListPopularRecipesQueryKey = ['recipesApi', 'listPopularRecipes'];

export const GetRecipeDetailsQueryKey = (id: RecipeId) => [
  'recipesApi',
  'getRecipeDetails',
  id,
];

export const useListPaginatedRecipes = (queryDto: IListRecipesQueryDto) => {
  const { recipesApi } = useRecipesApi();

  return usePaginatedQuery<IRecipeListItemDto, IRecipeListItem>(
    ListPaginatedRecipesQueryKey(queryDto),
    ({ pageParam = 0 }) =>
      recipesApi.listRecipesPaginated({
        ...queryDto,
        page: pageParam,
        perPage: 20,
      }),
    20,
    {
      select: PaginationSelector(RecipeListItemSelector),
    }
  );
};

export const useListPopularRecipes = () => {
  const { recipesApi } = useRecipesApi();

  return useAdaptedQuery<IRecipeListItemDto[], IRecipeListItem[]>(
    ListPopularRecipesQueryKey,
    () => recipesApi.listPopularRecipes(),
    {
      select: ListSelector(RecipeListItemSelector),
    }
  );
};

export const useConnectedCategories = () => {
  const [categories] = useListCategories();

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
