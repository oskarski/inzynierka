import { List, SearchBar } from 'antd-mobile';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { ApiError, ApiErrorMessage } from '@fe/errors';
import { Loader } from '@fe/components';
import {
  IIngredientListItemDto,
  IListIngredientsDto,
  IngredientId,
} from '@lib/shared';
import { useListIngredients } from '@fe/ingredients';
import { assertIsDefined } from '@fe/utils';
import { debounce } from 'lodash';

interface IngredientsSearchContext {
  ingredients: IIngredientListItemDto[];
  loading: boolean;
  isFetching: boolean;
  error: ApiError | null;
  onSearch: (query: string) => void;
}

const IngredientsSearchContext = createContext<
  Partial<IngredientsSearchContext>
>({});

export const IngredientsSearch = ({ children }: PropsWithChildren<{}>) => {
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

  const ctx: IngredientsSearchContext = {
    ingredients,
    loading,
    isFetching,
    error,
    onSearch: debouncedOnSearch,
  };

  return (
    <IngredientsSearchContext.Provider value={ctx}>
      {children}
    </IngredientsSearchContext.Provider>
  );
};

const useIngredientsSearch = (): IngredientsSearchContext => {
  const { ingredients, loading, isFetching, error, onSearch } = useContext(
    IngredientsSearchContext
  );

  assertIsDefined(
    ingredients,
    'IngredientsSearchContext.ingredients must be deifned!'
  );
  assertIsDefined(loading, 'IngredientsSearchContext.loading must be deifned!');
  assertIsDefined(
    isFetching,
    'IngredientsSearchContext.isFetching must be deifned!'
  );
  assertIsDefined(error, 'IngredientsSearchContext.error must be deifned!');
  assertIsDefined(
    onSearch,
    'IngredientsSearchContext.onSearch must be deifned!'
  );

  return { ingredients, loading, isFetching, error, onSearch };
};

interface IngredientsSearchBarProps {
  className?: string;
}

export const IngredientsSearchBar = ({
  className,
}: IngredientsSearchBarProps) => {
  const { onSearch } = useIngredientsSearch();

  return (
    <SearchBar
      placeholder="Szukaj składników"
      className={className}
      onChange={onSearch}
    />
  );
};

interface IngredientsSearchResultListProps {
  selectIngredient: (ingredient: IIngredientListItemDto) => void;
  isIngredientSelected: (ingredientId: IngredientId) => boolean;
}

export const IngredientsSearchResultList = ({
  selectIngredient,
  isIngredientSelected,
}: IngredientsSearchResultListProps) => {
  const { ingredients, loading, isFetching, error } = useIngredientsSearch();

  return (
    <>
      <ApiErrorMessage error={error} />

      {(loading || isFetching) && <Loader className="my-3" />}

      {!loading && ingredients.length === 0 && (
        <p className="text-sm text-gray-500 text-center mt-3">
          Nie znaleźliśmy pasujacych składników
        </p>
      )}

      {ingredients.length > 0 && (
        <List>
          {ingredients.map((ingredient) => (
            <List.Item
              key={ingredient.id}
              arrow={
                isIngredientSelected(ingredient.id) ? (
                  <span className="text-sm text-success">Dodano</span>
                ) : (
                  <button
                    className="text-sm text-secondary"
                    onClick={() => selectIngredient(ingredient)}
                  >
                    Dodaj
                  </button>
                )
              }
            >
              {ingredient.name}
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
};
