import {
  IListCategoriesQueryDto,
  IRecipeCategoryListItemDto,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IRecipesCategoriesApi {
  listCategories(
    queryDto: IListCategoriesQueryDto
  ): Promise<IRecipeCategoryListItemDto[]>;
}

export class RecipesCategoriesApi implements IRecipesCategoriesApi {
  private readonly baseUrl = '/recipe-categories';

  constructor(private readonly httpClient: HttpClient) {}

  listCategories(
    queryDto: IListCategoriesQueryDto
  ): Promise<IRecipeCategoryListItemDto[]> {
    return this.httpClient.get<IRecipeCategoryListItemDto[]>(
      this.baseUrl,
      queryDto
    );
  }
}
