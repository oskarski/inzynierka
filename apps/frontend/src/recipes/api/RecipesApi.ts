import {
  IRecipeListItemDto,
  IListRecipesQueryDto,
  IPaginated,
  RecipeId,
  IRecipeDto,
  IPaginationQueryDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IRecipesApi {
  listRecipesPaginated(
    dto: IListRecipesQueryDto & IPaginationQueryDto
  ): Promise<IPaginated<IRecipeListItemDto>>;

  listPopularRecipes(): Promise<IRecipeListItemDto[]>;

  getRecipeDetails(id: RecipeId): Promise<IRecipeDto>;
}

export class RecipesApi implements IRecipesApi {
  private readonly baseUrl = '/recipes';

  constructor(private readonly httpClient: HttpClient) {}

  listRecipesPaginated(
    dto: IListRecipesQueryDto
  ): Promise<IPaginated<IRecipeListItemDto>> {
    return this.httpClient.get<IPaginated<IRecipeListItemDto>>(
      this.baseUrl,
      dto
    );
  }

  listPopularRecipes(): Promise<IRecipeListItemDto[]> {
    return this.httpClient.get<IRecipeListItemDto[]>(`${this.baseUrl}/popular`);
  }

  getRecipeDetails(id: RecipeId): Promise<IRecipeDto> {
    return this.httpClient.get<IRecipeDto>(`${this.baseUrl}/${id}`);
  }
}
