import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { RecipeId } from '@lib/shared';
import {
  useAddRecipeToFavourites,
  useListFavouriteRecipes,
  useRemoveRecipeFromFavourites,
} from '@fe/recipes';

interface FavouriteRecipeButtonProps {
  recipeId: RecipeId;
}

export const FavouriteRecipeButton = ({
  recipeId,
}: FavouriteRecipeButtonProps) => {
  const [favouriteRecipes] = useListFavouriteRecipes();

  const [addToFavourite, addToFavouriteLoading] =
    useAddRecipeToFavourites(recipeId);

  const [removeFromFavourite, removeFromFavouriteLoading] =
    useRemoveRecipeFromFavourites(recipeId);

  if (!favouriteRecipes) return null;

  const isAddedToFavourites = !!favouriteRecipes.find(
    (recipe) => recipe.id === recipeId
  );

  return (
    <button
      className="text-2xl leading-none text-red-500"
      disabled={addToFavouriteLoading || removeFromFavouriteLoading}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isAddedToFavourites) removeFromFavourite();
        else addToFavourite();
      }}
    >
      {isAddedToFavourites ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
};
