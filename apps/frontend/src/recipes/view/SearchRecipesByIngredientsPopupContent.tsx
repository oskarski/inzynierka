import { AppPopup, Loader } from '@fe/components';
import { Button, List, SearchBar, Stepper } from 'antd-mobile';
import React, { useCallback, useState } from 'react';
import { useListIngredients } from '@fe/ingredients';
import { debounce } from 'lodash';
import { IListIngredientsDto } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';

export const SearchRecipesByIngredientsPopupContent =
  AppPopup.withAppPopupContent(() => {
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

    const selectedIngredients = [
      { id: '4', name: 'Ryż', quantity: 1, unit: 'szt.' },
      { id: '5', name: 'Cebula', quantity: 1, unit: 'szt.' },
      { id: '6', name: 'Czosnek', quantity: 1, unit: 'szt.' },
      {
        id: '7',
        name: 'Ananas w plastrach z puszki',
        quantity: 1,
        unit: 'szt.',
      },
    ];

    return (
      <>
        <AppPopup.Title>Jakie masz składniki?</AppPopup.Title>

        <SearchBar
          placeholder="Szukaj składników"
          className="mb-3"
          onChange={debouncedOnSearch}
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
                    <button className="text-sm text-secondary">Dodaj</button>
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

                        <button className="text-sm text-red-500">Usuń</button>
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
          <Button block={true} color="primary">
            Szukamy!
          </Button>
        </div>
      </>
    );
  });
