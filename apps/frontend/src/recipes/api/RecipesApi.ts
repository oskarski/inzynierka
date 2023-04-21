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
}
