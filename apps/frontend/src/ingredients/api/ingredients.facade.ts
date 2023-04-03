import { useIngredients } from '../Ingredients.context';
import { useAdaptedQuery } from '@fe/utils';
import { IIngredientListItemDto, IListIngredientsDto } from '@lib/shared';

export const useListIngredients = (dto: IListIngredientsDto) => {
  const { ingredientsApi } = useIngredients();

  return useAdaptedQuery<IIngredientListItemDto[]>(
    ['ingredientsApi', 'listIngredients', dto.name],
    () => ingredientsApi.listIngredients(dto),
    { keepPreviousData: true }
  );
};
