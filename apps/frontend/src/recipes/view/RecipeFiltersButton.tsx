import { AppPopup } from '@fe/components';
import { ControlOutlined } from '@ant-design/icons';
import { Button, Checkbox, Radio } from 'antd-mobile';
import React from 'react';
import { useRecipesFilters } from '@fe/recipes';
import { useListCategories } from '@fe/recipes-categories';
import { CategoryType } from '@lib/shared';

export const RecipeFiltersButton = () => {
  return (
    <AppPopup>
      <AppPopup.TriggerButton className="text-3xl text-secondary">
        <ControlOutlined />
      </AppPopup.TriggerButton>

      <RecipeFiltersPopupContent />
    </AppPopup>
  );
};

const RecipeFiltersPopupContent = AppPopup.withAppPopupContent(() => {
  const closePopup = AppPopup.useClosePopup();

  const { setPreparationTimeFilter } = useRecipesFilters();

  return (
    <>
      <AppPopup.Title>Filtruj przepisy</AppPopup.Title>

      <DishTypeFilters />

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

  const [dishTypeCategories, loading, error] = useListCategories({
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
