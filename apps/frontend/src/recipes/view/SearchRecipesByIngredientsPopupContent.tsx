import { AppPopup, Loader } from '@fe/components';
import { Button, List, SearchBar } from 'antd-mobile';
import React, { useCallback, useState } from 'react';
import { useListIngredients } from '@fe/ingredients';
import { debounce } from 'lodash';
import { IListIngredientsDto } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';
import { useRecipesFilters } from '../RecipesFilters.context';
import { routes, useRouting } from '@fe/utils';

const useSearchIngredients = () => {
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

export const SearchRecipesByIngredientsPopupContent =
  AppPopup.withAppPopupContent(() => {
    const { redirectTo } = useRouting();

    const { ingredients, loading, isFetching, error, onSearch } =
      useSearchIngredients();

    const {
      selectedIngredients,
      selectIngredient,
      unselectIngredient,
      isIngredientSelected,
    } = useRecipesFilters();

    const closePopup = AppPopup.useClosePopup();

    const onSubmit = () => {
      closePopup();
      redirectTo(routes.recipes());
    };

    return (
      <>
        <AppPopup.Title>Jakie masz składniki?</AppPopup.Title>

        <SearchBar
          placeholder="Szukaj składników"
          className="mb-3"
          onChange={onSearch}
        />

        <div className="overflow-y-auto">
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

          {selectedIngredients.length > 0 && (
            <>
              <h5 className="text-2xl text-default font-medium mt-7 mb-3">
                Twoje składniki
              </h5>

              <List>
                {selectedIngredients.map((ingredient) => (
                  <List.Item
                    key={ingredient.id}
                    arrow={
                      <>
                        {/* For now the basic version does not include quantity and unit */}
                        {/*<div className="flex items-center text-sm mr-3">*/}
                        {/*  <Stepper min={1} defaultValue={1} className="mr-2" />*/}
                        {/*  <select>*/}
                        {/*    <option value="">szt.</option>*/}
                        {/*  </select>*/}
                        {/*</div>*/}

                        <button
                          className="text-sm text-red-500"
                          onClick={() => unselectIngredient(ingredient.id)}
                        >
                          Usuń
                        </button>
                      </>
                    }
                  >
                    {ingredient.name}
                  </List.Item>
                ))}
              </List>
            </>
          )}
        </div>

        <div className="pt-4">
          <Button block={true} color="primary" onClick={onSubmit}>
            Szukamy!
          </Button>
        </div>
      </>
    );
  });
