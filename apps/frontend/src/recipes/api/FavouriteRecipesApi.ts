import {
  IRecipeListItemDto,
  RecipeId,
  IAddRecipeToFavouritesDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IFavouriteRecipesApi {
  addRecipeToFavorites(recipeId: RecipeId): Promise<void>;

  listFavouriteRecipes(): Promise<IRecipeListItemDto[]>;

  removeRecipeFromFavorites(recipeId: RecipeId): Promise<void>;
}

export class FavouriteRecipesApi implements IFavouriteRecipesApi {
  private readonly baseUrl = '/favourite-recipes';

  constructor(private readonly httpClient: HttpClient) {}

  async addRecipeToFavorites(recipeId: RecipeId): Promise<void> {
    await this.httpClient.post<IAddRecipeToFavouritesDto, void>(this.baseUrl, {
      recipeId,
    });
  }

  listFavouriteRecipes(): Promise<IRecipeListItemDto[]> {
    return this.httpClient.get<IRecipeListItemDto[]>(this.baseUrl);
  }

  async removeRecipeFromFavorites(recipeId: RecipeId): Promise<void> {
    await this.httpClient.delete(`${this.baseUrl}/${recipeId}`);
  }
}
