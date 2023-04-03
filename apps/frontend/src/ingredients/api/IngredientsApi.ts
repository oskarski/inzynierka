import { IIngredientListItemDto, IListIngredientsDto } from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IIngredientsApi {
  listIngredients(dto: IListIngredientsDto): Promise<IIngredientListItemDto[]>;
}

export class IngredientsApi implements IIngredientsApi {
  private readonly baseUrl = '/ingredients';

  constructor(private readonly httpClient: HttpClient) {}

  listIngredients(dto: IListIngredientsDto): Promise<IIngredientListItemDto[]> {
    return this.httpClient.get<IIngredientListItemDto[]>(this.baseUrl, dto);
  }
}
