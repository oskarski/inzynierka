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
  RecipeCategoryId,
} from '@lib/shared';
import { useIngredientsSelection } from '@fe/ingredients';

type FiltersAction =
  | {
      type: 'select-preparation-time-filter';
      value: IListRecipesPreparationTimeFiltersDto;
    }
  | {
      type: 'select-dish-type-filter';
      categoryId: RecipeCategoryId;
    }
  | {
      type: 'unselect-dish-type-filter';
      categoryId: RecipeCategoryId;
    }
  | {
      type: 'clear-dish-type-filter';
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
    case 'select-dish-type-filter':
      return {
        ...state,
        dishTypeCategoryIds: [
          ...(state.dishTypeCategoryIds || []),
          action.categoryId,
        ],
      };
    case 'unselect-dish-type-filter': {
      const dishTypeCategoryIds = state.dishTypeCategoryIds?.filter(
        (categoryId) => categoryId !== action.categoryId
      );

      return {
        ...state,
        dishTypeCategoryIds:
          dishTypeCategoryIds?.length === 0 ? undefined : dishTypeCategoryIds,
      };
    }
    case 'clear-dish-type-filter':
      return {
        ...state,
        dishTypeCategoryIds: undefined,
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
  clearDishTypeFilter: () => void;
  selectDishTypeFilter: (categoryId: RecipeCategoryId) => void;
  unselectDishTypeFilter: (categoryId: RecipeCategoryId) => void;
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

  const clearDishTypeFilter = useCallback(
    () => dispatch({ type: 'clear-dish-type-filter' }),
    []
  );

  const selectDishTypeFilter = useCallback(
    (categoryId: RecipeCategoryId) =>
      dispatch({ type: 'select-dish-type-filter', categoryId }),
    []
  );

  const unselectDishTypeFilter = useCallback(
    (categoryId: RecipeCategoryId) =>
      dispatch({ type: 'unselect-dish-type-filter', categoryId }),
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
    clearDishTypeFilter,
    selectDishTypeFilter,
    unselectDishTypeFilter,
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
    clearDishTypeFilter,
    selectDishTypeFilter,
    unselectDishTypeFilter,
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
  assertIsDefined(
    clearDishTypeFilter,
    'IRecipesFiltersContext.clearDishTypeFilter must be defined!'
  );
  assertIsDefined(
    selectDishTypeFilter,
    'IRecipesFiltersContext.selectDishTypeFilter must be defined!'
  );
  assertIsDefined(
    unselectDishTypeFilter,
    'IRecipesFiltersContext.unselectDishTypeFilter must be defined!'
  );

  return {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
    clearSelection,
    filters,
    setPreparationTimeFilter,
    clearDishTypeFilter,
    selectDishTypeFilter,
    unselectDishTypeFilter,
  };
};
