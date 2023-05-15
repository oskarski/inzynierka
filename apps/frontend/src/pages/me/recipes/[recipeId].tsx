import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { Loader, SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import { RecipeForm, useRecipeDetails } from '@fe/recipes';
import { RecipeId } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async ({ params }) => {
    const recipeId: RecipeId = params?.recipeId as RecipeId;

    return { props: { recipeId } };
  })
);

interface EditYourRecipePageProps {
  recipeId: RecipeId;
}

export default function EditYourRecipePage({
  recipeId,
}: EditYourRecipePageProps) {
  const [recipe, loading, getRecipeError] = useRecipeDetails(recipeId);

  const error = null;

  const [saveRecipe, saveRecipeLoading] = [
    (formValues: any) => {
      console.log('SAVE WILL BE HERE', formValues);
    },
    false,
  ];

  const [publishRecipe, publishRecipeLoading] = [
    (formValues: any) => {
      console.log('PUBLISH WILL BE HERE', formValues);
    },
    false,
  ];

  const [unpublishRecipe, unpublishRecipeLoading] = [
    (formValues: any) => {
      console.log('UNPUBLISH WILL BE HERE', formValues);
    },
    false,
  ];

  return (
    <>
      <Head>
        <title>{headTitle('Edytuj przepis')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Edytuj przepis</SectionTitle>

        {loading && <Loader />}

        <ApiErrorMessage size="base" error={getRecipeError} />

        {recipe && (
          <RecipeForm
            error={error}
            defaultValues={recipe}
            primaryAction={{
              onSubmit: (formValues) =>
                saveRecipe({
                  ...formValues,
                  ingredients:
                    formValues.ingredients &&
                    Object.values(formValues.ingredients),
                }),
              loading: saveRecipeLoading,
            }}
            secondaryAction={{
              onSubmit: (formValues) =>
                (recipe.isPublished ? unpublishRecipe : publishRecipe)({
                  ...formValues,
                  ingredients:
                    formValues.ingredients &&
                    Object.values(formValues.ingredients),
                }),
              loading: publishRecipeLoading || unpublishRecipeLoading,
              cta: recipe.isPublished ? 'Wycofaj publikacje' : 'Opublikuj',
            }}
          />
        )}
      </main>
    </>
  );
}
