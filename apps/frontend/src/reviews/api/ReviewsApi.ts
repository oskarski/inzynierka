import { RecipeId, IAddReviewDto, IUserRecipeReviewDto } from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IReviewsApi {
  addReview(recipeId: RecipeId, dto: IAddReviewDto): Promise<void>;

  getUserReviewForRecipe(recipeId: RecipeId): Promise<IUserRecipeReviewDto>;
}

export class ReviewsApi implements IReviewsApi {
  private readonly baseUrl = '/reviews';

  constructor(private readonly httpClient: HttpClient) {}

  addReview(recipeId: RecipeId, dto: IAddReviewDto): Promise<void> {
    return this.httpClient.post<IAddReviewDto, void>(this.baseUrl, dto);
  }

  getUserReviewForRecipe(recipeId: RecipeId): Promise<IUserRecipeReviewDto> {
    return this.httpClient.get<IUserRecipeReviewDto>(
      `${this.baseUrl}/${recipeId}`
    );
  }
}
