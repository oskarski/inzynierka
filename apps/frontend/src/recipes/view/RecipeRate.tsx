import { Rate } from 'antd-mobile';
import React from 'react';
import { useAddReview } from '@fe/reviews';
import { RecipeId } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';

interface RecipeRateProps {
  recipeId: RecipeId;
  rate?: number;
}

export const RecipeRate = ({ recipeId, rate }: RecipeRateProps) => {
  const [addReview, loading, error] = useAddReview(recipeId);

  return (
    <>
      <Rate
        defaultValue={rate}
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
