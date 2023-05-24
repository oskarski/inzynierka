import { ShoppingOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { IngredientId, IRecipeIngredientDto } from '@lib/shared';
import { AppPopup, PickerBasedSelect } from '@fe/components';
import { Button, List, SafeArea, Stepper } from 'antd-mobile';
import { useUnitOptions } from '@fe/ingredients';
import { useBulkAddToShoppingList } from '@fe/shopping-list';
import { ApiErrorMessage } from '@fe/errors';
import { routes, useRouting } from '@fe/utils';

interface AddRecipeIngredientsToShoppingListButtonProps {
  ingredients: IRecipeIngredientDto[];
}

export const AddRecipeIngredientsToShoppingListButton = ({
  ingredients,
}: AddRecipeIngredientsToShoppingListButtonProps) => {
  return (
    <AppPopup>
      <AppPopup.TriggerButton className="text-secondary text-xs font-normal inline-flex items-center">
        <ShoppingOutlined className="text-base leading-none mr-1.5" />
        Dodaj do zakupów
      </AppPopup.TriggerButton>

      <AddRecipeIngredientsToShoppingListPopupContent
        ingredients={ingredients}
      />
    </AppPopup>
  );
};

interface AddRecipeIngredientsToShoppingListPopupContentProps {
  ingredients: IRecipeIngredientDto[];
}

const useIngredientsSelection = (ingredients: IRecipeIngredientDto[]) => {
  const [selectedIngredients, setSelectedIngredients] =
    useState<IRecipeIngredientDto[]>(ingredients);

  const resetSelection = useCallback(
    () => setSelectedIngredients(ingredients),
    [ingredients]
  );

  const unselectIngredient = useCallback(
    (ingredientId: IngredientId) =>
      setSelectedIngredients((prev) =>
        prev.filter((item) => item.id !== ingredientId)
      ),
    []
  );

  const changeQuantity = useCallback(
    (ingredientId: IngredientId) => (quantity: number) =>
      setSelectedIngredients((prev) =>
        prev.map((item) => {
          if (item.id === ingredientId) return { ...item, quantity };

          return item;
        })
      ),
    []
  );

  const changeUnit = useCallback(
    (ingredientId: IngredientId) => (unit: string) =>
      setSelectedIngredients((prev) =>
        prev.map((item) => {
          if (item.id === ingredientId) return { ...item, unit };

          return item;
        })
      ),
    []
  );

  return {
    selectedIngredients,
    resetSelection,
    unselectIngredient,
    changeQuantity,
    changeUnit,
  };
};

const AddRecipeIngredientsToShoppingListPopupContent =
  AppPopup.withAppPopupContent(
    ({ ingredients }: AddRecipeIngredientsToShoppingListPopupContentProps) => {
      const closePopup = AppPopup.useClosePopup();

      const { redirectTo } = useRouting();

      const {
        selectedIngredients,
        resetSelection,
        unselectIngredient,
        changeQuantity,
        changeUnit,
      } = useIngredientsSelection(ingredients);

      const unitOptions = useUnitOptions();

      const [bulkAddToShoppingList, loading, error] = useBulkAddToShoppingList({
        onSuccess: () => {
          resetSelection();
          closePopup();
          redirectTo(routes.shoppingList());
        },
      });

      return (
        <>
          <AppPopup.Title>Dodaj do listy zakupów</AppPopup.Title>

          <List style={{ '--padding-left': '0' }} className="overflow-y-auto">
            {selectedIngredients.map((ingredient) => (
              <List.Item
                key={ingredient.id}
                arrow={
                  <>
                    <div className="flex items-center text-sm mr-3">
                      <Stepper
                        min={1}
                        value={ingredient.quantity}
                        className="mr-2"
                        onChange={changeQuantity(ingredient.id)}
                      />

                      <PickerBasedSelect
                        value={ingredient.unit}
                        options={unitOptions}
                        onChange={changeUnit(ingredient.id)}
                      />
                    </div>

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

          <div className="pt-4">
            <Button
              loading={loading}
              block={true}
              color="primary"
              onClick={() =>
                bulkAddToShoppingList({
                  items: selectedIngredients.map((ingredient) => ({
                    ingredientId: ingredient.id,
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
