import { AppPopup } from '@fe/components';
import { ControlOutlined } from '@ant-design/icons';
import { Badge, Button, Checkbox, Radio } from 'antd-mobile';
import React, { useMemo } from 'react';
import { useRecipesFilters } from '@fe/recipes';
import { useListCategories } from '@fe/recipes-categories';
import { CategoryType, RecipeDifficulty } from '@lib/shared';
import { RecipeDifficultyText } from '@fe/recipes/view/RecipeDifficultyText';

export const RecipeFiltersButton = () => {
  const { filters } = useRecipesFilters();

  const selectedFiltersCount = useMemo(() => {
    let selectedFiltersCount = 0;
    if (filters.dishTypeCategoryIds)
      selectedFiltersCount += filters.dishTypeCategoryIds.length;
    if (filters.cuisineTypeCategoryIds)
      selectedFiltersCount += filters.cuisineTypeCategoryIds.length;
    if (filters.dietTypeCategoryIds)
      selectedFiltersCount += filters.dietTypeCategoryIds.length;
    if (filters.otherCategoryIds)
      selectedFiltersCount += filters.otherCategoryIds.length;
    if (filters.minPreparationTime !== undefined) selectedFiltersCount += 1;
    if (filters.maxPreparationTime !== undefined) selectedFiltersCount += 1;

    return selectedFiltersCount;
  }, [filters]);

  return (
    <AppPopup>
      <Badge content={selectedFiltersCount || null}>
        <AppPopup.TriggerButton className="text-3xl text-secondary">
          <ControlOutlined />
        </AppPopup.TriggerButton>
      </Badge>

      <RecipeFiltersPopupContent />
    </AppPopup>
  );
};

const RecipeFiltersPopupContent = AppPopup.withAppPopupContent(() => {
  const closePopup = AppPopup.useClosePopup();

  return (
    <>
      <AppPopup.Title>Filtruj przepisy</AppPopup.Title>

      <div className="overflow-y-auto px-1">
        <DishTypeFilters />

        <CuisineTypeFilters />

        <DifficultyFilters />

        <PreparationTimeFilters />

        <DietTypeFilters />

        <OtherCategoryFilters />
      </div>

      <div className="pt-4">
        <Button block={true} color="primary" onClick={closePopup}>
          Filtruj
        </Button>
      </div>
    </>
  );
});

function DishTypeFilters() {
  const {
    filters,
    selectDishTypeFilter,
    unselectDishTypeFilter,
    clearDishTypeFilter,
  } = useRecipesFilters();

  const [dishTypeCategories, , error] = useListCategories({
    type: CategoryType.DishType,
  });

  if (error) return null;

  return (
    <div className="space-y-3">
      <h5 className="text-lg text-default font-medium">Typ dania</h5>

      <div className="-mx-1">
        <Checkbox.Group value={filters.dishTypeCategoryIds || ['any']}>
          <Checkbox
            className="px-1 mb-3"
            checked={!filters.dishTypeCategoryIds}
            value={'any'}
            onChange={(checked) => checked && clearDishTypeFilter()}
          >
            Dowolny
          </Checkbox>

          {dishTypeCategories &&
            dishTypeCategories.map((category) => (
              <Checkbox
                key={category.id}
                className="px-1 mb-3"
                value={category.id}
                onChange={(checked) =>
                  checked
                    ? selectDishTypeFilter(category.id)
                    : unselectDishTypeFilter(category.id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}

function CuisineTypeFilters() {
  const {
    filters,
    selectCuisineTypeFilter,
    unselectCuisineTypeFilter,
    clearCuisineTypeFilter,
  } = useRecipesFilters();

  const [cuisineTypeCategories, , error] = useListCategories({
    type: CategoryType.CuisineType,
  });

  if (error) return null;

  return (
    <div className="space-y-3">
      <h5 className="text-lg text-default font-medium">Kuchnia</h5>

      <div className="-mx-1">
        <Checkbox.Group value={filters.cuisineTypeCategoryIds || ['any']}>
          <Checkbox
            className="px-1 mb-3"
            checked={!filters.cuisineTypeCategoryIds}
            value={'any'}
            onChange={(checked) => checked && clearCuisineTypeFilter()}
          >
            Dowolna
          </Checkbox>

          {cuisineTypeCategories &&
            cuisineTypeCategories.map((category) => (
              <Checkbox
                key={category.id}
                className="px-1 mb-3"
                value={category.id}
                onChange={(checked) =>
                  checked
                    ? selectCuisineTypeFilter(category.id)
                    : unselectCuisineTypeFilter(category.id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}

function DifficultyFilters() {
  const {
    filters,
    selectDifficultyFilter,
    unselectDifficultyFilter,
    clearDifficultyFilter,
  } = useRecipesFilters();

  return (
    <div className="space-y-3">
      <h5 className="text-lg text-default font-medium">Trudność</h5>

      <div className="-mx-1">
        <Checkbox.Group
          value={
            filters.difficulty ? filters.difficulty.map((d) => `${d}`) : ['any']
          }
        >
          <Checkbox
            className="px-1 mb-3"
            checked={!filters.difficulty}
            value={'any'}
            onChange={(checked) => checked && clearDifficultyFilter()}
          >
            Dowolna
          </Checkbox>

          <Checkbox
            className="px-1 mb-3"
            value={RecipeDifficulty.easy}
            onChange={(checked) =>
              checked
                ? selectDifficultyFilter(RecipeDifficulty.easy)
                : unselectDifficultyFilter(RecipeDifficulty.easy)
            }
          >
            <RecipeDifficultyText difficulty={RecipeDifficulty.easy} />
          </Checkbox>

          <Checkbox
            className="px-1 mb-3"
            value={RecipeDifficulty.medium}
            onChange={(checked) =>
              checked
                ? selectDifficultyFilter(RecipeDifficulty.medium)
                : unselectDifficultyFilter(RecipeDifficulty.medium)
            }
          >
            <RecipeDifficultyText difficulty={RecipeDifficulty.medium} />
          </Checkbox>

          <Checkbox
            className="px-1 mb-3"
            value={RecipeDifficulty.difficult}
            onChange={(checked) =>
              checked
                ? selectDifficultyFilter(RecipeDifficulty.difficult)
                : unselectDifficultyFilter(RecipeDifficulty.difficult)
            }
          >
            <RecipeDifficultyText difficulty={RecipeDifficulty.difficult} />
          </Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  );
}

function DietTypeFilters() {
  const {
    filters,
    selectDietTypeFilter,
    unselectDietTypeFilter,
    clearDietTypeFilter,
  } = useRecipesFilters();

  const [dietTypeCategories, , error] = useListCategories({
    type: CategoryType.DietType,
  });

  if (error) return null;

  return (
    <div className="space-y-3">
      <h5 className="text-lg text-default font-medium">Dieta</h5>

      <div className="-mx-1">
        <Checkbox.Group value={filters.dietTypeCategoryIds || ['any']}>
          <Checkbox
            className="px-1 mb-3"
            checked={!filters.dietTypeCategoryIds}
            value={'any'}
            onChange={(checked) => checked && clearDietTypeFilter()}
          >
            Dowolna
          </Checkbox>

          {dietTypeCategories &&
            dietTypeCategories.map((category) => (
              <Checkbox
                key={category.id}
                className="px-1 mb-3"
                value={category.id}
                onChange={(checked) =>
                  checked
                    ? selectDietTypeFilter(category.id)
                    : unselectDietTypeFilter(category.id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}

function OtherCategoryFilters() {
  const {
    filters,
    selectOtherCategoryFilter,
    unselectOtherCategoryFilter,
    clearOtherCategoryFilter,
  } = useRecipesFilters();

  const [otherCategories, , error] = useListCategories({
    type: CategoryType.Other,
  });

  if (error) return null;

  return (
    <div className="space-y-3">
      <h5 className="text-lg text-default font-medium">Kategorie</h5>

      <div className="-mx-1">
        <Checkbox.Group value={filters.otherCategoryIds || ['any']}>
          <Checkbox
            className="px-1 mb-3"
            checked={!filters.otherCategoryIds}
            value={'any'}
            onChange={(checked) => checked && clearOtherCategoryFilter()}
          >
            Wszystkie
          </Checkbox>

          {otherCategories &&
            otherCategories.map((category) => (
              <Checkbox
                key={category.id}
                className="px-1 mb-3"
                value={category.id}
                onChange={(checked) =>
                  checked
                    ? selectOtherCategoryFilter(category.id)
                    : unselectOtherCategoryFilter(category.id)
                }
              >
                {category.name}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}

function PreparationTimeFilters() {
  const { setPreparationTimeFilter } = useRecipesFilters();

  return (
    <div className="space-y-3">
      <h5 className="text-lg text-default font-medium">Czas przygotowania</h5>

      <div className="-mx-1">
        <Radio.Group defaultValue="select-any-preparation-time-filter">
          <Radio
            className="px-1 mb-3"
            value="select-any-preparation-time-filter"
            onChange={() => setPreparationTimeFilter({})}
          >
            Dowolny
          </Radio>

          <Radio
            className="px-1 mb-3"
            value="select-max-20-min-preparation-time-filter"
            onChange={() =>
              setPreparationTimeFilter({ maxPreparationTime: 20 * 60 })
            }
          >
            Do 20 min
          </Radio>

          <Radio
            className="px-1 mb-3"
            value="select-max-60-min-preparation-time-filter"
            onChange={() =>
              setPreparationTimeFilter({ maxPreparationTime: 60 * 60 })
            }
          >
            Do godziny
          </Radio>

          <Radio
            className="px-1 mb-3"
            value="select-min-60-min-preparation-time-filter"
            onChange={() =>
              setPreparationTimeFilter({ minPreparationTime: 60 * 60 })
            }
          >
            Ponad godzinę
          </Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
