import { RecipeId, IAddReviewDto } from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IReviewsApi {
  addReview(recipeId: RecipeId, dto: IAddReviewDto): Promise<void>;
}

export class ReviewsApi implements IReviewsApi {
  private readonly baseUrl = '/reviews';

  constructor(private readonly httpClient: HttpClient) {}

  addReview(recipeId: RecipeId, dto: IAddReviewDto): Promise<void> {
    return this.httpClient.post<IAddReviewDto, void>(this.baseUrl, dto);
  }
}
