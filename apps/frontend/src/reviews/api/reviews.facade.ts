import { useReviewsApi } from './ReviewsApi.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import { IAddReviewDto, IUserRecipeReviewDto, RecipeId } from '@lib/shared';
import { useQueryClient } from 'react-query';
import { ApiError } from '@fe/errors';

export const GetUserReviewForRecipeQueryKey = (recipeId: RecipeId) => [
  'reviewsApi.getUserReviewForRecipe',
  recipeId,
];

export const useAddReview = (recipeId: RecipeId) => {
  const queryClient = useQueryClient();

  const { reviewsApi } = useReviewsApi();

  return useAdaptedMutation<void, IAddReviewDto, ApiError>(
    (dto) => reviewsApi.addReview(recipeId, dto),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(GetUserReviewForRecipeQueryKey(recipeId)),
    }
  );
};

export const useGetUserReviewForRecipe = (recipeId: RecipeId) => {
  const { reviewsApi } = useReviewsApi();

  return useAdaptedQuery<IUserRecipeReviewDto>(
    GetUserReviewForRecipeQueryKey(recipeId),
    () => reviewsApi.getUserReviewForRecipe(recipeId)
  );
};
