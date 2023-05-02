import { useIngredientsApi } from './IngredientsApi.context';
import { useAdaptedQuery } from '@fe/utils';
import { IIngredientListItemDto, IListIngredientsDto } from '@lib/shared';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

export const useListIngredients = (dto: IListIngredientsDto) => {
  const { ingredientsApi } = useIngredientsApi();

  return useAdaptedQuery<IIngredientListItemDto[]>(
    ['ingredientsApi', 'listIngredients', dto.name],
    () => ingredientsApi.listIngredients(dto),
    { keepPreviousData: true }
  );
};

export const useSearchIngredients = () => {
  const [queryDto, setQueryDto] = useState<IListIngredientsDto>({ name: '' });

  const [ingredients = [], loading, error, { isFetching }] =
    useListIngredients(queryDto);

  const debouncedOnSearch = useCallback(
    debounce(
      (phrase) => setQueryDto((prev) => ({ ...prev, name: phrase })),
      350
    ),
    []
  );

  return {
    ingredients,
    loading,
    isFetching,
    error,
    onSearch: debouncedOnSearch,
  };
};
