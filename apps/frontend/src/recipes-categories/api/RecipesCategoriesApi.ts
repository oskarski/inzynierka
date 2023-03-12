import { IRecipeCategoryListItemDto } from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IRecipesCategoriesApi {
  listAllCategories(): Promise<IRecipeCategoryListItemDto[]>;
}

export class RecipesCategoriesApi implements IRecipesCategoriesApi {
  private readonly baseUrl = '/recipe-categories';

  constructor(private readonly httpClient: HttpClient) {}

  listAllCategories(): Promise<IRecipeCategoryListItemDto[]> {
    return this.httpClient.get<IRecipeCategoryListItemDto[]>(this.baseUrl);
  }
}
