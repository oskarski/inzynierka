import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { RecipeId } from '@lib/shared';
import { useAddRecipeToFavourites } from '@fe/recipes';

interface FavouriteRecipeButtonProps {
  recipeId: RecipeId;
}

export const FavouriteRecipeButton = ({
  recipeId,
}: FavouriteRecipeButtonProps) => {
  const [addToFavourite] = useAddRecipeToFavourites(recipeId);

  const favourites = ['12'];

  return (
    <button
      className="text-2xl leading-none text-red-500"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        addToFavourite();
      }}
    >
      {favourites.includes(recipeId) ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
};
