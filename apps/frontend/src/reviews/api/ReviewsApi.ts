import { RecipeId, IReviewListItemDto } from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IReviewsApi {
  addReview(recipeId: RecipeId, dto: IReviewListItemDto): Promise<void>;
}

export class ReviewsApi implements IReviewsApi {
  private readonly baseUrl = '/reviews';

  constructor(private readonly httpClient: HttpClient) {}

  addReview(recipeId: RecipeId, dto: IReviewListItemDto): Promise<void> {
    return this.httpClient.post<IReviewListItemDto, void>(this.baseUrl, dto);
  }
}
