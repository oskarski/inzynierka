import {
  RecipeId,
  ISaveDraftRecipeDto,
  IPublishRecipeDto,
  IRecipeListItemDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IMyRecipesApi {
  createRecipe(dto: ISaveDraftRecipeDto): Promise<RecipeId>;

  createAndPublishRecipe(dto: IPublishRecipeDto): Promise<RecipeId>;

  listMyRecipes(): Promise<IRecipeListItemDto[]>;

  publishRecipe(recipeId: RecipeId, dto: IPublishRecipeDto): Promise<void>;

  unpublishRecipe(recipeId: RecipeId, dto: ISaveDraftRecipeDto): Promise<void>;
}

export class MyRecipesApi implements IMyRecipesApi {
  private readonly baseUrl = '/me/recipes';

  constructor(private readonly httpClient: HttpClient) {}

  createRecipe(dto: ISaveDraftRecipeDto): Promise<RecipeId> {
    return this.httpClient.post<ISaveDraftRecipeDto, RecipeId>(
      this.baseUrl,
      dto
    );
  }

  createAndPublishRecipe(dto: IPublishRecipeDto): Promise<RecipeId> {
    return this.httpClient.post<IPublishRecipeDto, RecipeId>(
      `${this.baseUrl}/publish`,
      dto
    );
  }

  listMyRecipes(): Promise<IRecipeListItemDto[]> {
    return this.httpClient.get<IRecipeListItemDto[]>(this.baseUrl);
  }

  publishRecipe(recipeId: RecipeId, dto: IPublishRecipeDto): Promise<void> {
    return this.httpClient.post<IPublishRecipeDto, void>(
      `${this.baseUrl}/${recipeId}/publish`,
      dto
    );
  }

  unpublishRecipe(recipeId: RecipeId, dto: ISaveDraftRecipeDto): Promise<void> {
    return this.httpClient.delete<ISaveDraftRecipeDto, void>(
      `${this.baseUrl}/${recipeId}/publish`,
      dto
    );
  }
}
