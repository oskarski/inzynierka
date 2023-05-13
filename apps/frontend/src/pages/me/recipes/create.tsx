import Head from 'next/head';
import { headTitle, routes, useRouting } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import { Form } from 'antd-mobile';
import React from 'react';
import {
  useCreateAndPublishRecipe,
  useCreateRecipe,
  RecipeForm,
} from '@fe/recipes';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function CreateYourRecipePage() {
  const { redirectTo } = useRouting();

  const [
    createAndPublishRecipe,
    createAndPublishRecipeLoading,
    createAndPublishRecipeError,
  ] = useCreateAndPublishRecipe({
    onSuccess: () => redirectTo(routes.yourRecipes()),
  });

  const [createRecipe, createRecipeLoading, createRecipeError] =
    useCreateRecipe({ onSuccess: () => redirectTo(routes.yourRecipes()) });

  const [form] = Form.useForm();

  const error = createRecipeError || createAndPublishRecipeError;

  return (
    <>
      <Head>
        <title>{headTitle('Dodaj przepis')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Dodaj przepis</SectionTitle>

        <RecipeForm
          error={error}
          primaryAction={{
            onSubmit: (formValues) =>
              createRecipe({
                ...formValues,
                ingredients:
                  formValues.ingredients &&
                  Object.values(formValues.ingredients),
              }),
            loading: createRecipeLoading,
          }}
          secondaryAction={{
            onSubmit: (formValues) =>
              createAndPublishRecipe({
                ...formValues,
                ingredients:
                  formValues.ingredients &&
                  Object.values(formValues.ingredients),
              }),
            loading: createAndPublishRecipeLoading,
            cta: 'Opublikuj',
          }}
        />
      </main>
    </>
  );
}
