import { useIngredientsApi } from './IngredientsApi.context';
import { useAdaptedQuery } from '@fe/utils';
import {
  IIngredientListItemDto,
  IListIngredientsDto,
  IngredientId,
} from '@lib/shared';
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

export const useIngredientsSelection = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    Map<IngredientId, IIngredientListItemDto>
  >(new Map());

  const selectIngredient = useCallback(
    (ingredient: IIngredientListItemDto) =>
      setSelectedIngredients(
        (prev) => new Map(prev.set(ingredient.id, ingredient))
      ),
    []
  );

  const unselectIngredient = useCallback(
    (ingredientId: IngredientId) =>
      setSelectedIngredients((prev) => {
        prev.delete(ingredientId);

        return new Map(prev);
      }),
    []
  );

  const isIngredientSelected = useCallback(
    (ingredientId: IngredientId) => selectedIngredients.has(ingredientId),
    [selectedIngredients]
  );

  return {
    selectedIngredients: Array.from(selectedIngredients.values()),
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  };
};
