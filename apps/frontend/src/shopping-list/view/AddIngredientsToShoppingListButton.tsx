import React, { useCallback, useState } from 'react';
import { IngredientId } from '@lib/shared';
import { AppPopup, PickerBasedSelect } from '@fe/components';
import { Button, List, SafeArea, Stepper } from 'antd-mobile';
import {
  IngredientsSearch,
  IngredientsSearchBar,
  IngredientsSearchResultList,
  useUnitOptions,
} from '@fe/ingredients';
import { useBulkAddToShoppingList } from '@fe/shopping-list';
import { ApiErrorMessage } from '@fe/errors';
import { useRouting } from '@fe/utils';

export const AddIngredientsToShoppingListButton = AppPopup.withAppPopup(() => {
  const openPopup = AppPopup.useOpenPopup();

  return (
    <>
      <Button block={true} color="primary" onClick={openPopup}>
        Dodaj
      </Button>

      <AddIngredientsToShoppingListPopupContent />
    </>
  );
});

interface ISelectedIngredient {
  readonly ingredientId: IngredientId;
  readonly quantity: number;
  readonly unit: string;
  readonly name: string;
}

const useIngredientsSelection = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    ISelectedIngredient[]
  >([]);

  const resetSelection = useCallback(() => setSelectedIngredients([]), []);

  const isIngredientSelected = useCallback(
    (ingredientId: IngredientId) =>
      !!selectedIngredients.find(
        (selectedIngredient) => selectedIngredient.ingredientId === ingredientId
      ),
    [selectedIngredients]
  );

  const selectIngredient = useCallback(
    (ingredient: ISelectedIngredient) =>
      setSelectedIngredients((prev) => [...prev, ingredient]),
    []
  );

  const unselectIngredient = useCallback(
    (ingredientId: IngredientId) =>
      setSelectedIngredients((prev) =>
        prev.filter((item) => item.ingredientId !== ingredientId)
      ),
    []
  );

  const changeQuantity = useCallback(
    (ingredientId: IngredientId) => (quantity: number) =>
      setSelectedIngredients((prev) =>
        prev.map((item) => {
          if (item.ingredientId === ingredientId) return { ...item, quantity };

          return item;
        })
      ),
    []
  );

  const changeUnit = useCallback(
    (ingredientId: IngredientId) => (unit: string) =>
      setSelectedIngredients((prev) =>
        prev.map((item) => {
          if (item.ingredientId === ingredientId) return { ...item, unit };

          return item;
        })
      ),
    []
  );

  return {
    selectedIngredients,
    isIngredientSelected,
    resetSelection,
    selectIngredient,
    unselectIngredient,
    changeQuantity,
    changeUnit,
  };
};

const AddIngredientsToShoppingListPopupContent = AppPopup.withAppPopupContent(
  () => {
    const closePopup = AppPopup.useClosePopup();

    const { redirectTo } = useRouting();

    const {
      selectedIngredients,
      isIngredientSelected,
      resetSelection,
      selectIngredient,
      unselectIngredient,
      changeQuantity,
      changeUnit,
    } = useIngredientsSelection();

    const unitOptions = useUnitOptions();

    const [bulkAddToShoppingList, loading, error] = useBulkAddToShoppingList({
      onSuccess: () => {
        resetSelection();
        closePopup();
      },
    });

    return (
      <>
        <AppPopup.Title>Dodaj do listy zakupów</AppPopup.Title>

        <IngredientsSearch>
          <IngredientsSearchBar className="mb-3" />

          <div className="overflow-y-auto">
            <IngredientsSearchResultList
              selectIngredient={(ingredient) =>
                selectIngredient({
                  ingredientId: ingredient.id,
                  name: ingredient.name,
                  quantity: 1,
                  unit: unitOptions[0].value,
                })
              }
              isIngredientSelected={isIngredientSelected}
            />

            {selectedIngredients.length > 0 && (
              <>
                <div className="flex items-center justify-between mt-7 mb-3">
                  <h5 className="text-2xl text-default font-medium">
                    Dodajesz
                  </h5>
                </div>

                <List>
                  {selectedIngredients.map((ingredient) => (
                    <List.Item
                      key={ingredient.ingredientId}
                      arrow={
                        <>
                          <div className="flex items-center text-sm mr-3">
                            <Stepper
                              min={1}
                              value={ingredient.quantity}
                              className="mr-2"
                              onChange={changeQuantity(ingredient.ingredientId)}
                            />

                            <PickerBasedSelect
                              value={ingredient.unit}
                              options={unitOptions}
                              onChange={changeUnit(ingredient.ingredientId)}
                            />
                          </div>

                          <button
                            className="text-sm text-red-500"
                            onClick={() =>
                              unselectIngredient(ingredient.ingredientId)
                            }
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
          <Button
            loading={loading}
            block={true}
            color="primary"
            onClick={() =>
              bulkAddToShoppingList({
                items: selectedIngredients.map((ingredient) => ({
                  ingredientId: ingredient.ingredientId,
                  quantity: ingredient.quantity,
                  unit: ingredient.unit,
                })),
              })
            }
          >
            Dodaj
          </Button>

          {error && <ApiErrorMessage error={error} className="mt-2" />}
        </div>

        <SafeArea position="bottom" />
      </>
    );
  },
  { destroyOnClose: true }
);
