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
    }
  | {
      type: 'select-cuisine-type-filter';
      categoryId: RecipeCategoryId;
    }
  | {
      type: 'unselect-cuisine-type-filter';
      categoryId: RecipeCategoryId;
    }
  | {
      type: 'clear-cuisine-type-filter';
    }
  | {
      type: 'select-diet-type-filter';
      categoryId: RecipeCategoryId;
    }
  | {
      type: 'unselect-diet-type-filter';
      categoryId: RecipeCategoryId;
    }
  | {
      type: 'clear-diet-type-filter';
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
    case 'select-cuisine-type-filter':
      return {
        ...state,
        cuisineTypeCategoryIds: [
          ...(state.cuisineTypeCategoryIds || []),
          action.categoryId,
        ],
      };
    case 'unselect-cuisine-type-filter': {
      const cuisineTypeCategoryIds = state.cuisineTypeCategoryIds?.filter(
        (categoryId) => categoryId !== action.categoryId
      );

      return {
        ...state,
        cuisineTypeCategoryIds:
          cuisineTypeCategoryIds?.length === 0
            ? undefined
            : cuisineTypeCategoryIds,
      };
    }
    case 'clear-cuisine-type-filter':
      return {
        ...state,
        cuisineTypeCategoryIds: undefined,
      };
    case 'select-diet-type-filter':
      return {
        ...state,
        dietTypeCategoryIds: [
          ...(state.dietTypeCategoryIds || []),
          action.categoryId,
        ],
      };
    case 'unselect-diet-type-filter': {
      const dietTypeCategoryIds = state.dietTypeCategoryIds?.filter(
        (categoryId) => categoryId !== action.categoryId
      );

      return {
        ...state,
        dietTypeCategoryIds:
          dietTypeCategoryIds?.length === 0 ? undefined : dietTypeCategoryIds,
      };
    }
    case 'clear-diet-type-filter':
      return {
        ...state,
        dietTypeCategoryIds: undefined,
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
  clearCuisineTypeFilter: () => void;
  selectCuisineTypeFilter: (categoryId: RecipeCategoryId) => void;
  unselectCuisineTypeFilter: (categoryId: RecipeCategoryId) => void;
  clearDietTypeFilter: () => void;
  selectDietTypeFilter: (categoryId: RecipeCategoryId) => void;
  unselectDietTypeFilter: (categoryId: RecipeCategoryId) => void;
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

  const clearCuisineTypeFilter = useCallback(
    () => dispatch({ type: 'clear-cuisine-type-filter' }),
    []
  );

  const selectCuisineTypeFilter = useCallback(
    (categoryId: RecipeCategoryId) =>
      dispatch({ type: 'select-cuisine-type-filter', categoryId }),
    []
  );

  const unselectCuisineTypeFilter = useCallback(
    (categoryId: RecipeCategoryId) =>
      dispatch({ type: 'unselect-cuisine-type-filter', categoryId }),
    []
  );

  const clearDietTypeFilter = useCallback(
    () => dispatch({ type: 'clear-diet-type-filter' }),
    []
  );

  const selectDietTypeFilter = useCallback(
    (categoryId: RecipeCategoryId) =>
      dispatch({ type: 'select-diet-type-filter', categoryId }),
    []
  );

  const unselectDietTypeFilter = useCallback(
    (categoryId: RecipeCategoryId) =>
      dispatch({ type: 'unselect-diet-type-filter', categoryId }),
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
    clearCuisineTypeFilter,
    selectCuisineTypeFilter,
    unselectCuisineTypeFilter,
    clearDietTypeFilter,
    selectDietTypeFilter,
    unselectDietTypeFilter,
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
    clearCuisineTypeFilter,
    selectCuisineTypeFilter,
    unselectCuisineTypeFilter,
    clearDietTypeFilter,
    selectDietTypeFilter,
    unselectDietTypeFilter,
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
  assertIsDefined(
    clearCuisineTypeFilter,
    'IRecipesFiltersContext.clearCuisineTypeFilter must be defined!'
  );
  assertIsDefined(
    selectCuisineTypeFilter,
    'IRecipesFiltersContext.selectCuisineTypeFilter must be defined!'
  );
  assertIsDefined(
    unselectCuisineTypeFilter,
    'IRecipesFiltersContext.unselectCuisineTypeFilter must be defined!'
  );
  assertIsDefined(
    clearDietTypeFilter,
    'IRecipesFiltersContext.clearDietTypeFilter must be defined!'
  );
  assertIsDefined(
    selectDietTypeFilter,
    'IRecipesFiltersContext.selectDietTypeFilter must be defined!'
  );
  assertIsDefined(
    unselectDietTypeFilter,
    'IRecipesFiltersContext.unselectDietTypeFilter must be defined!'
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
    clearCuisineTypeFilter,
    selectCuisineTypeFilter,
    unselectCuisineTypeFilter,
    clearDietTypeFilter,
    selectDietTypeFilter,
    unselectDietTypeFilter,
  };
};
