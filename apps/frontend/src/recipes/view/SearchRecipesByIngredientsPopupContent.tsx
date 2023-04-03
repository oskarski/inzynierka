import { AppPopup } from '@fe/components';
import { Button, List, SearchBar, Stepper } from 'antd-mobile';
import React from 'react';

export const SearchRecipesByIngredientsPopupContent = () => {
  const ingredients = [
    { id: '1', name: 'Pomidor' },
    { id: '2', name: 'Papryka' },
    { id: '3', name: 'Pierś kurczaka' },
  ];
  const selectedIngredients = [
    { id: '4', name: 'Ryż', quantity: 1, unit: 'szt.' },
    { id: '5', name: 'Cebula', quantity: 1, unit: 'szt.' },
    { id: '6', name: 'Czosnek', quantity: 1, unit: 'szt.' },
    { id: '7', name: 'Ananas w plastrach z puszki', quantity: 1, unit: 'szt.' },
  ];

  return (
    <AppPopup.Content>
      <AppPopup.Title>Jakie masz składniki?</AppPopup.Title>

      <SearchBar placeholder="Szukaj składników" className="mb-3" />

      <div className="overflow-y-auto">
        {ingredients.length === 0 && (
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
                      <div className="flex items-center text-sm mr-3">
                        <Stepper min={1} defaultValue={1} className="mr-2" />
                        <select>
                          <option value="">szt.</option>
                        </select>
                      </div>

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
    </AppPopup.Content>
  );
};
