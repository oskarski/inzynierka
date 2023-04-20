import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { RecipeId } from '@lib/shared';

interface FavouriteRecipeButtonProps {
  recipeId: RecipeId;
}

export const FavouriteRecipeButton = ({
  recipeId,
}: FavouriteRecipeButtonProps) => {
  const favourites = ['12'];

  return (
    <button className="text-2xl leading-none text-red-500">
      {favourites.includes(recipeId) ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
};
