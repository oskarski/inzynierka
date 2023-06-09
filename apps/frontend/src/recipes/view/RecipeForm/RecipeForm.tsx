import { AppForm, SubmitButton } from '@fe/form';
import React from 'react';
import { Button, CapsuleTabs, Form, SafeArea } from 'antd-mobile';
import { FormValidationOrApiError } from '@fe/errors';
import { IRecipe } from '../../api';
import {
  RecipeFormGeneralTab,
  RecipeFormGeneralTabTitle,
} from './RecipeFormGeneralTab';
import {
  RecipeFormIngredientsTab,
  RecipeFormIngredientsTabTitle,
} from './RecipeFormIngredientsTab';
import {
  RecipeFormInstructionsTab,
  RecipeFormInstructionsTabTitle,
} from './RecipeFormInstructionsTab';

interface RecipeFormProps {
  error: FormValidationOrApiError | null;
  defaultValues?: IRecipe;
  primaryAction: {
    onSubmit: (formValues: any) => void;
    loading: boolean;
  };
  secondaryAction?: {
    onSubmit: (formValues: any) => void;
    loading: boolean;
    cta: string;
  };
}

export const RecipeForm = ({
  error,
  defaultValues,
  primaryAction,
  secondaryAction,
}: RecipeFormProps) => {
  const [form] = Form.useForm();

  return (
    <AppForm
      className="pb-24 sm:pb-10"
      form={form}
      onSubmit={primaryAction.onSubmit}
      error={error}
      footerClassName="fixed bottom-20 left-4 right-4 sm:bottom-6 md:left-48"
      submitBtn={
        <div className="space-y-3">
          {secondaryAction && (
            <Button
              type="button"
              loading={secondaryAction.loading}
              disabled={primaryAction.loading}
              block={true}
              color="primary"
              size="middle"
              onClick={() => {
                const formValues = form.getFieldsValue(true);

                secondaryAction.onSubmit(formValues);
              }}
            >
              {secondaryAction.cta}
            </Button>
          )}

          <div className="bg-white">
            <SubmitButton
              loading={primaryAction.loading}
              disabled={secondaryAction?.loading}
              fill="outline"
              size="middle"
            >
              Zapisz
            </SubmitButton>
          </div>

          <SafeArea position="bottom" />
        </div>
      }
    >
      <CapsuleTabs>
        <CapsuleTabs.Tab
          title={<RecipeFormGeneralTabTitle error={error} />}
          key="general"
          forceRender={true}
        >
          <RecipeFormGeneralTab error={error} defaultValues={defaultValues} />
        </CapsuleTabs.Tab>

        <CapsuleTabs.Tab
          title={<RecipeFormIngredientsTabTitle error={error} />}
          key="ingredients"
          forceRender={true}
        >
          <RecipeFormIngredientsTab
            error={error}
            defaultValues={defaultValues}
          />
        </CapsuleTabs.Tab>

        <CapsuleTabs.Tab
          title={<RecipeFormInstructionsTabTitle error={error} />}
          key="instructions"
          forceRender={true}
        >
          <RecipeFormInstructionsTab
            error={error}
            defaultValues={defaultValues}
          />
        </CapsuleTabs.Tab>
      </CapsuleTabs>
    </AppForm>
  );
};
