import { AppPopup, LinkButton } from '@fe/components';
import { Button, List, SafeArea } from 'antd-mobile';
import React from 'react';
import { useRecipesFilters } from '../RecipesFilters.context';
import { routes, useRouting } from '@fe/utils';
import {
  IngredientsSearch,
  IngredientsSearchBar,
  IngredientsSearchResultList,
} from '@fe/ingredients';

export const SearchRecipesByIngredientsPopupContent =
  AppPopup.withAppPopupContent(() => {
    const { redirectTo } = useRouting();

    const {
      selectedIngredients,
      selectIngredient,
      unselectIngredient,
      isIngredientSelected,
      clearSelection,
    } = useRecipesFilters();

    const closePopup = AppPopup.useClosePopup();

    const onSubmit = () => {
      closePopup();
      redirectTo(routes.recipes());
    };

    return (
      <>
        <AppPopup.Title>Jakie masz składniki?</AppPopup.Title>

        <IngredientsSearch>
          <IngredientsSearchBar className="mb-3" />

          <div className="overflow-y-auto">
            <IngredientsSearchResultList
              selectIngredient={selectIngredient}
              isIngredientSelected={isIngredientSelected}
            />

            {selectedIngredients.length > 0 && (
              <>
                <div className="flex items-center justify-between mt-7 mb-3">
                  <h5 className="text-2xl text-default font-medium">
                    Twoje składniki
                  </h5>

                  <LinkButton onClick={clearSelection}>Wyczyść</LinkButton>
                </div>

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
        </IngredientsSearch>

        <div className="pt-4">
          <Button block={true} color="primary" onClick={onSubmit}>
            Szukamy!
          </Button>
        </div>

        <SafeArea position="bottom" />
      </>
    );
  });
