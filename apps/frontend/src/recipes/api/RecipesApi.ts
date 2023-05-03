import {
  IRecipeListItemDto,
  IListRecipesQueryDto,
  IPaginated,
  RecipeId,
  IRecipeDto,
  ICreateRecipeDto,
  IPublishRecipeDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IRecipesApi {
  createRecipe(dto: ICreateRecipeDto): Promise<RecipeId>;

  createAndPublishRecipe(dto: IPublishRecipeDto): Promise<RecipeId>;

  publishRecipe(recipeId: RecipeId, dto: IPublishRecipeDto): Promise<void>;

  listRecipesPaginated(
    dto: IListRecipesQueryDto
  ): Promise<IPaginated<IRecipeListItemDto>>;

  getRecipeDetails(id: RecipeId): Promise<IRecipeDto>;
}

export class RecipesApi implements IRecipesApi {
  private readonly baseUrl = '/recipes';

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

  publishRecipe(recipeId: RecipeId, dto: IPublishRecipeDto): Promise<void> {
    return this.httpClient.post<IPublishRecipeDto, void>(
      `${this.baseUrl}/${recipeId}/publish`,
      dto
    );
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
}
