import { useReviewsApi } from './ReviewsApi.context';
import { useAdaptedMutation } from '@fe/utils';
import { IAddReviewDto, RecipeId } from '@lib/shared';
import { useQueryClient } from 'react-query';
import { ApiError } from '@fe/errors';

export const useAddReview = (recipeId: RecipeId) => {
  const queryClient = useQueryClient();

  const { reviewsApi } = useReviewsApi();

  return useAdaptedMutation<void, IAddReviewDto, ApiError>(
    (dto) => reviewsApi.addReview(recipeId, dto),
    {
      // TODO onSuccess invalidate recipe review
    }
  );
};
