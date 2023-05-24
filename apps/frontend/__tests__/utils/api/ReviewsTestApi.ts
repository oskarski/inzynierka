import { apiMethodMock } from './apiMethodMock';
import { IReviewsApi } from '@fe/reviews';

export class ReviewsTestApi implements IReviewsApi {
  addReview = apiMethodMock<IReviewsApi['addReview']>('IReviewsApi.addReview');

  getUserReviewForRecipe = apiMethodMock<IReviewsApi['getUserReviewForRecipe']>(
    'IReviewsApi.getUserReviewForRecipe'
  );
}
