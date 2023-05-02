import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IIngredientListItemDto, IngredientId } from '@lib/shared';
import { useIngredientsSelection } from '@fe/ingredients';

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
  const {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  } = useIngredientsSelection();

  const ctx: IRecipesFiltersContext = {
    selectedIngredients,
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
