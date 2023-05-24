import { Rate } from 'antd-mobile';
import React from 'react';
import { useAddReview, useGetUserReviewForRecipe } from '@fe/reviews';
import { RecipeId } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';
import { Loader } from '@fe/components';

interface RecipeRateProps {
  recipeId: RecipeId;
}

export const RecipeRate = ({ recipeId }: RecipeRateProps) => {
  const [userReview, loadingUserReview] = useGetUserReviewForRecipe(recipeId);
  const [addReview, loading, error] = useAddReview(recipeId);

  if (loadingUserReview) return <Loader />;

  return (
    <>
      <Rate
        defaultValue={userReview?.value}
        onChange={(value) =>
          addReview({
            review_value: value,
            recipe_id: recipeId,
          })
        }
      />

      {error && <ApiErrorMessage error={error} className="mt-2" />}
    </>
  );
};
