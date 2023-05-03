import {
  RecipeId,
  ICreateRecipeDto,
  IPublishRecipeDto,
  IRecipeListItemDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IMyRecipesApi {
  createRecipe(dto: ICreateRecipeDto): Promise<RecipeId>;

  createAndPublishRecipe(dto: IPublishRecipeDto): Promise<RecipeId>;

  listMyRecipes(): Promise<IRecipeListItemDto[]>;

  publishRecipe(recipeId: RecipeId, dto: IPublishRecipeDto): Promise<void>;
}

export class MyRecipesApi implements IMyRecipesApi {
  private readonly baseUrl = '/me/recipes';

  constructor(private readonly httpClient: HttpClient) {}

  createRecipe(dto: ICreateRecipeDto): Promise<RecipeId> {
    return this.httpClient.post<ICreateRecipeDto, RecipeId>(this.baseUrl, dto);
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
}
