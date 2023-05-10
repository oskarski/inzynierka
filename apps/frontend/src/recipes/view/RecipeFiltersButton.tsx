import { AppPopup } from '@fe/components';
import { ControlOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd-mobile';
import React from 'react';
import { useRecipesFilters } from '@fe/recipes';

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
