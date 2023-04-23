import {
  IRecipeListItemDto,
  IListRecipesQueryDto,
  IPaginated,
  RecipeId,
  IRecipeDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IRecipesApi {
  listPaginatedRecipes(
    dto: IListRecipesQueryDto
  ): Promise<IPaginated<IRecipeListItemDto>>;

  getRecipeDetails(id: RecipeId): Promise<IRecipeDto>;

  addRecipeToFavorites(recipeId: RecipeId): Promise<void>;
}

export class RecipesApi implements IRecipesApi {
  private readonly baseUrl = '/recipes';

  constructor(private readonly httpClient: HttpClient) {}

  listPaginatedRecipes(
    dto: IListRecipesQueryDto
  ): Promise<IPaginated<IRecipeListItemDto>> {
    return this.httpClient.get<IPaginated<IRecipeListItemDto>>(
      this.baseUrl,
      dto
    );
  }

  getRecipeDetails(id: RecipeId): Promise<IRecipeDto> {
    return this.httpClient.get<IRecipeDto>(`${this.baseUrl}/${id}`);
  }

  async addRecipeToFavorites(recipeId: RecipeId): Promise<void> {
    await this.httpClient.post<{}, void>(
      `${this.baseUrl}/${recipeId}/favourite`,
      {}
    );
  }
}
