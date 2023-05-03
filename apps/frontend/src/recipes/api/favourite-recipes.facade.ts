import { useRecipesApi } from './RecipesApi.context';
import { ListSelector, useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import { IRecipeListItemDto, RecipeId } from '@lib/shared';
import { RecipeListItemSelector } from './selectors';
import { IRecipeListItem } from './types';
import { ApiError } from '@fe/errors';
import { useQueryClient } from 'react-query';

export const ListFavouriteRecipesQueryKey = [
  'recipesApi',
  'listFavouriteRecipes',
];

export const useAddRecipeToFavourites = (id: RecipeId) => {
  const queryClient = useQueryClient();

  const { favouriteRecipesApi } = useRecipesApi();

  return useAdaptedMutation<void, void, ApiError>(
    () => favouriteRecipesApi.addRecipeToFavorites(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(ListFavouriteRecipesQueryKey),
    }
  );
};

export const useListFavouriteRecipes = () => {
  const { favouriteRecipesApi } = useRecipesApi();

  return useAdaptedQuery<IRecipeListItemDto[], IRecipeListItem[]>(
    ListFavouriteRecipesQueryKey,
    () => favouriteRecipesApi.listFavouriteRecipes(),
    {
      select: ListSelector(RecipeListItemSelector),
    }
  );
};

export const useRemoveRecipeFromFavourites = (id: RecipeId) => {
  const queryClient = useQueryClient();

  const { favouriteRecipesApi } = useRecipesApi();

  return useAdaptedMutation<void, void>(
    () => favouriteRecipesApi.removeRecipeFromFavorites(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(ListFavouriteRecipesQueryKey),
    }
  );
};
