import { useIngredientsApi } from './IngredientsApi.context';
import { useAdaptedQuery } from '@fe/utils';
import {
  IIngredientListItemDto,
  IListIngredientsDto,
  IngredientId,
} from '@lib/shared';
import { useCallback, useState } from 'react';

export const ListIngredientsQueryKey = (dto: IListIngredientsDto) => [
  'ingredientsApi',
  'listIngredients',
  dto,
];

export const useListIngredients = (dto: IListIngredientsDto) => {
  const { ingredientsApi } = useIngredientsApi();

  return useAdaptedQuery<IIngredientListItemDto[]>(
    ListIngredientsQueryKey(dto),
    () => ingredientsApi.listIngredients(dto),
    { keepPreviousData: true }
  );
};

export const useIngredientsSelection = (
  defaultSelectedIngredients: IIngredientListItemDto[] = []
) => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    Map<IngredientId, IIngredientListItemDto>
  >(
    new Map(
      defaultSelectedIngredients.map((selectedIngredient) => [
        selectedIngredient.id,
        selectedIngredient,
      ])
    )
  );

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

  const clearSelection = useCallback(
    () => setSelectedIngredients(new Map()),
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
    clearSelection,
  };
};

export const useUnitOptions = () => {
  return [
    { value: 'szt.', label: 'szt.' },
    { value: 'l', label: 'l' },
    { value: 'ml', label: 'ml' },
    { value: 'g', label: 'g' },
    { value: 'łyżki', label: 'łyżki' },
    { value: 'łyżeczki', label: 'łyżeczki' },
    { value: 'szklanki', label: 'szklanki' },
  ];
};
