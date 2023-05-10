import { assertIsDefined } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  IIngredientListItemDto,
  IListRecipesFiltersDto,
  IListRecipesPreparationTimeFiltersDto,
  IngredientId,
} from '@lib/shared';
import { useIngredientsSelection } from '@fe/ingredients';

type FiltersAction = {
  type: 'select-preparation-time-filter';
  value: IListRecipesPreparationTimeFiltersDto;
};

const filtersReducer = (
  state: IListRecipesFiltersDto,
  action: FiltersAction
): IListRecipesFiltersDto => {
  switch (action.type) {
    case 'select-preparation-time-filter':
      return {
        ...state,
        minPreparationTime: action.value.minPreparationTime,
        maxPreparationTime: action.value.maxPreparationTime,
      };
    default:
      return state;
  }
};

interface IRecipesFiltersContext {
  selectedIngredients: IIngredientListItemDto[];
  selectIngredient: (ingredient: IIngredientListItemDto) => void;
  unselectIngredient: (ingredientId: IngredientId) => void;
  isIngredientSelected: (ingredientId: IngredientId) => boolean;
  clearSelection: () => void;
  filters: IListRecipesFiltersDto;
  setPreparationTimeFilter: (
    filter: IListRecipesPreparationTimeFiltersDto
  ) => void;
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
    clearSelection,
  } = useIngredientsSelection();

  const [filters, dispatch] = useReducer(filtersReducer, {});

  const setPreparationTimeFilter = useCallback(
    (value: IListRecipesPreparationTimeFiltersDto) =>
      dispatch({ type: 'select-preparation-time-filter', value }),
    []
  );

  const ctx: IRecipesFiltersContext = {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
    clearSelection,
    filters,
    setPreparationTimeFilter,
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
    clearSelection,
    filters,
    setPreparationTimeFilter,
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
  assertIsDefined(
    clearSelection,
    'IRecipesFiltersContext.clearSelection must be defined!'
  );
  assertIsDefined(filters, 'IRecipesFiltersContext.filters must be defined!');
  assertIsDefined(
    setPreparationTimeFilter,
    'IRecipesFiltersContext.setPreparationTimeFilter must be defined!'
  );

  return {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
    clearSelection,
    filters,
    setPreparationTimeFilter,
  };
};
