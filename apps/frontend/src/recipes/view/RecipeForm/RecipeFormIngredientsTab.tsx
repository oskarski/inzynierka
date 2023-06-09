import {
  FormValidationError,
  FormValidationErrorMessage,
  FormValidationOrApiError,
} from '@fe/errors';
import { IRecipe } from '@fe/recipes';
import {
  IngredientsSearch,
  IngredientsSearchBar,
  IngredientsSearchResultList,
  useIngredientsSelection,
  useUnitOptions,
} from '@fe/ingredients';
import { HiddenField, PickerBasedSelectField, StepperField } from '@fe/form';
import { ExclamationCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { List } from 'antd-mobile';
import React from 'react';
import { intersection } from 'lodash';

interface RecipeFormIngredientsTabProps {
  error: FormValidationOrApiError | null;
  defaultValues?: IRecipe;
}

const names = {
  portions: 'portions',
  ingredients: 'ingredients',
};

export function RecipeFormIngredientsTab({
  error,
  defaultValues,
}: RecipeFormIngredientsTabProps) {
  const {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  } = useIngredientsSelection(defaultValues?.ingredients);

  const unitOptions = useUnitOptions();

  return (
    <>
      <div className="border-b mb-3">
        <StepperField
          name={names.portions}
          min={1}
          initialValue={defaultValues?.portions || 4}
          error={error}
          label={
            <div className="flex items-center">
              <TeamOutlined className="mr-2" />
              Ilość porcji
            </div>
          }
        />
      </div>

      <IngredientsSearch>
        <IngredientsSearchBar className="mb-3" />

        <FormValidationErrorMessage name={names.ingredients} error={error} />

        <div className="overflow-y-auto">
          <IngredientsSearchResultList
            selectIngredient={selectIngredient}
            isIngredientSelected={isIngredientSelected}
          />

          {selectedIngredients.length > 0 && (
            <>
              <h5 className="text-2xl text-default font-medium mt-7 mb-3">
                Składniki
              </h5>

              <List>
                {selectedIngredients.map((ingredient) => (
                  <List.Item key={ingredient.id}>
                    <HiddenField
                      name={['ingredients', ingredient.id, 'id']}
                      initialValue={ingredient.id}
                      noStyle={true}
                    />

                    <StepperField
                      name={['ingredients', ingredient.id, 'quantity']}
                      min={1}
                      error={error}
                      label={ingredient.name}
                      initialValue={
                        defaultValues?.ingredients.find(
                          (i) => i.id === ingredient.id
                        )?.quantity || 1
                      }
                      noStyle={true}
                      suffix={
                        <div className="ml-2 flex items-center">
                          <PickerBasedSelectField
                            name={['ingredients', ingredient.id, 'unit']}
                            error={error}
                            noStyle={true}
                            initialValue={
                              defaultValues?.ingredients.find(
                                (i) => i.id === ingredient.id
                              )?.unit || 'szt.'
                            }
                            options={unitOptions}
                          />

                          <button
                            className="ml-3 text-sm text-red-500"
                            onClick={() => unselectIngredient(ingredient.id)}
                          >
                            Usuń
                          </button>
                        </div>
                      }
                    />
                  </List.Item>
                ))}
              </List>
            </>
          )}
        </div>
      </IngredientsSearch>
    </>
  );
}

interface RecipeFormIngredientsTabTitleProps {
  error: FormValidationOrApiError | null;
}

export function RecipeFormIngredientsTabTitle({
  error,
}: RecipeFormIngredientsTabTitleProps) {
  const tabHasErrors =
    error instanceof FormValidationError &&
    intersection(Object.keys(error.errorsMap), Object.values(names)).length > 0;

  return (
    <div className="flex items-center justify-center">
      {tabHasErrors && (
        <ExclamationCircleOutlined className="text-sm leading-none mr-1" />
      )}
      Składniki
    </div>
  );
}
