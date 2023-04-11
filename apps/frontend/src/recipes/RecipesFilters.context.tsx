import { assertIsDefined } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { IIngredientListItemDto, IngredientId } from '@lib/shared';

interface IRecipesFiltersContext {
  selectedIngredients: IIngredientListItemDto[];
  selectIngredient: (ingredient: IIngredientListItemDto) => void;
  unselectIngredient: (ingredientId: IngredientId) => void;
  isIngredientSelected: (ingredientId: IngredientId) => boolean;
}

const RecipesFiltersContext = createContext<Partial<IRecipesFiltersContext>>(
  {}
);

export const RecipesFiltersProvider = ({ children }: PropsWithChildren<{}>) => {
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

  const ctx: IRecipesFiltersContext = {
    selectedIngredients: Array.from(selectedIngredients.values()),
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  };

  return (
    <RecipesFiltersContext.Provider value={ctx}>
      {children}
    </RecipesFiltersContext.Provider>
  );
};

export const useRecipesFilters = (): IRecipesFiltersContext => {
  const {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  } = useContext(RecipesFiltersContext);

  assertIsDefined(
    selectedIngredients,
    'IRecipesFiltersContext.selectedIngredients must be defined!'
  );
  assertIsDefined(
    selectIngredient,
    'IRecipesFiltersContext.selectIngredient must be defined!'
  );
  assertIsDefined(
    unselectIngredient,
    'IRecipesFiltersContext.unselectIngredient must be defined!'
  );
  assertIsDefined(
    isIngredientSelected,
    'IRecipesFiltersContext.isIngredientSelected must be defined!'
  );

  return {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  };
};
