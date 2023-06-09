import {
  FormValidationError,
  FormValidationErrorMessage,
  FormValidationOrApiError,
} from '@fe/errors';
import { IRecipe } from '@fe/recipes';
import { StepperField, TextAreaField } from '@fe/form';
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Form } from 'antd-mobile';
import React from 'react';
import { intersection } from 'lodash';

interface RecipeFormInstructionsTabProps {
  error: FormValidationOrApiError | null;
  defaultValues?: IRecipe;
}

const names = {
  preparationTime: 'preparationTime',
  instructions: 'instructions',
};

export function RecipeFormInstructionsTab({
  error,
  defaultValues,
}: RecipeFormInstructionsTabProps) {
  return (
    <>
      <div className="border-b mb-3">
        <StepperField
          name={names.preparationTime}
          min={5}
          initialValue={defaultValues ? defaultValues.preparationTime / 60 : 30}
          step={5}
          error={error}
          suffix="min"
          label={
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2" />
              Czas przygotowania
            </div>
          }
        />
      </div>

      <div className="instructions-field">
        <Form.Array
          name={names.instructions}
          renderAdd={() => (
            <PlusCircleOutlined className="text-primary text-xl" />
          )}
          initialValue={defaultValues?.instructions || [{}]}
        >
          {(fields, { add, remove }) =>
            fields.map(({ index }) => (
              <>
                <button
                  type="button"
                  className="text-primary text-xl block mx-auto"
                  onClick={() => add({}, index)}
                >
                  <PlusCircleOutlined />
                </button>

                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-primary mr-2"
                    onClick={() => remove(index)}
                  >
                    <MinusCircleOutlined />
                  </button>

                  <h6 className="text-sm text-secondary font-normal">
                    Krok {index + 1}
                  </h6>
                </div>

                <TextAreaField
                  errorNamePrefix="instructions,"
                  name={[index, 'step']}
                  rows={3}
                  error={error}
                  placeholder="Wpisz instrukcje ..."
                />
              </>
            ))
          }
        </Form.Array>

        <FormValidationErrorMessage name={names.instructions} error={error} />
      </div>
    </>
  );
}

interface RecipeFormInstructionsTabTitleProps {
  error: FormValidationOrApiError | null;
}

export function RecipeFormInstructionsTabTitle({
  error,
}: RecipeFormInstructionsTabTitleProps) {
  const tabHasErrors =
    error instanceof FormValidationError &&
    Object.keys(error.errorsMap).find((errorNameKey) =>
      Object.values(names).reduce(
        (prev, current) => prev || errorNameKey.startsWith(current),
        false
      )
    );

  error instanceof FormValidationError && console.log(error.errorsMap);

  return (
    <div className="flex items-center justify-center">
      {tabHasErrors && (
        <ExclamationCircleOutlined className="text-sm leading-none mr-1" />
      )}
      Instrukcje
    </div>
  );
}
