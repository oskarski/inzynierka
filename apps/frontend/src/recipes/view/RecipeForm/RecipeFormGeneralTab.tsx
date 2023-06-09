import { FormValidationOrApiError } from '@fe/errors';
import { IRecipe, RecipeDifficultyText } from '@fe/recipes';
import { useListCategories } from '@fe/recipes-categories';
import { CategoryType, RecipeDifficulty } from '@lib/shared';
import { intersection } from 'lodash';
import { CheckboxField, RadioField, TextAreaField, TextField } from '@fe/form';
import React from 'react';

interface RecipeFormGeneralTabProps {
  error: FormValidationOrApiError | null;
  defaultValues?: IRecipe;
}

export function RecipeFormGeneralTab({
  error,
  defaultValues,
}: RecipeFormGeneralTabProps) {
  const [dietTypeCategories] = useListCategories({
    type: CategoryType.DietType,
  });
  const [dishTypeCategories] = useListCategories({
    type: CategoryType.DishType,
  });
  const [cuisineTypeCategories] = useListCategories({
    type: CategoryType.CuisineType,
  });

  const initialDietTypes =
    dietTypeCategories &&
    defaultValues &&
    intersection(
      dietTypeCategories.map((category) => category.id),
      defaultValues.categoryIds
    );
  const initialDishTypes =
    dishTypeCategories &&
    defaultValues &&
    intersection(
      dishTypeCategories.map((category) => category.id),
      defaultValues.categoryIds
    );
  const initialCuisineTypes =
    cuisineTypeCategories &&
    defaultValues &&
    intersection(
      cuisineTypeCategories.map((category) => category.id),
      defaultValues.categoryIds
    );

  return (
    <>
      <TextField
        name="name"
        label="Tytuł"
        error={error}
        initialValue={defaultValues?.name}
      />

      <TextAreaField
        name="description"
        label="Opis"
        rows={3}
        error={error}
        initialValue={defaultValues?.description}
      />

      <RadioField
        name="difficulty"
        label="Trudność"
        error={error}
        initialValue={defaultValues?.difficulty || RecipeDifficulty.medium}
        options={[
          {
            value: RecipeDifficulty.easy,
            label: <RecipeDifficultyText difficulty={RecipeDifficulty.easy} />,
          },
          {
            value: RecipeDifficulty.medium,
            label: (
              <RecipeDifficultyText difficulty={RecipeDifficulty.medium} />
            ),
          },
          {
            value: RecipeDifficulty.difficult,
            label: (
              <RecipeDifficultyText difficulty={RecipeDifficulty.difficult} />
            ),
          },
        ]}
      />

      {dietTypeCategories && (
        <CheckboxField
          name="dietType"
          label="Dieta"
          error={error}
          initialValue={initialDietTypes}
          options={
            dietTypeCategories?.map((category) => ({
              value: category.id,
              label: category.name,
            })) || []
          }
        />
      )}

      {dietTypeCategories && (
        <CheckboxField
          name="dishType"
          label="Typ Dania"
          error={error}
          initialValue={initialDishTypes}
          options={
            dishTypeCategories?.map((category) => ({
              value: category.id,
              label: category.name,
            })) || []
          }
        />
      )}

      {cuisineTypeCategories && (
        <CheckboxField
          name="cuisineType"
          label="Kuchnia"
          error={error}
          initialValue={initialCuisineTypes}
          options={
            cuisineTypeCategories?.map((category) => ({
              value: category.id,
              label: category.name,
            })) || []
          }
        />
      )}
    </>
  );
}
