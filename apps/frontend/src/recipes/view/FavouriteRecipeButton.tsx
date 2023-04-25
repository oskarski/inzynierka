import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { RecipeId } from '@lib/shared';
import { useAddRecipeToFavourites, useListFavouriteRecipes } from '@fe/recipes';

interface FavouriteRecipeButtonProps {
  recipeId: RecipeId;
}

export const FavouriteRecipeButton = ({
  recipeId,
}: FavouriteRecipeButtonProps) => {
  const [favouriteRecipes] = useListFavouriteRecipes();

  const [addToFavourite] = useAddRecipeToFavourites(recipeId);

  if (!favouriteRecipes) return null;

  return (
    <button
      className="text-2xl leading-none text-red-500"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        addToFavourite();
      }}
    >
      {favouriteRecipes.find((recipe) => recipe.id === recipeId) ? (
        <HeartFilled />
      ) : (
        <HeartOutlined />
      )}
    </button>
  );
};
