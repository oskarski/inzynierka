import {
  IRecipeListItemDto,
  IListRecipesQueryDto,
  IPaginated,
  RecipeId,
  IRecipeDto,
  ICreateRecipeDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IRecipesApi {
  createRecipe(dto: ICreateRecipeDto): Promise<RecipeId>;

  listRecipesPaginated(
    dto: IListRecipesQueryDto
  ): Promise<IPaginated<IRecipeListItemDto>>;

  getRecipeDetails(id: RecipeId): Promise<IRecipeDto>;

  addRecipeToFavorites(recipeId: RecipeId): Promise<void>;

  listFavouriteRecipes(): Promise<IRecipeListItemDto[]>;

  removeRecipeFromFavorites(recipeId: RecipeId): Promise<void>;
}

export class RecipesApi implements IRecipesApi {
  private readonly baseUrl = '/recipes';

  constructor(private readonly httpClient: HttpClient) {}

  createRecipe(dto: ICreateRecipeDto): Promise<RecipeId> {
    return this.httpClient.post<ICreateRecipeDto, RecipeId>(this.baseUrl, dto);
  }

  listRecipesPaginated(
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
      `${this.baseUrl}/favourite/${recipeId}`,
      {}
    );
  }

  listFavouriteRecipes(): Promise<IRecipeListItemDto[]> {
    return this.httpClient.get<IRecipeListItemDto[]>(
      `${this.baseUrl}/favourite`
    );
  }

  async removeRecipeFromFavorites(recipeId: RecipeId): Promise<void> {
    await this.httpClient.delete(`${this.baseUrl}/favourite/${recipeId}`);
  }
}
