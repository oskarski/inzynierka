import Head from 'next/head';
import { env, headTitle, HttpClient, routes, useRouting } from '@fe/utils';
import { Loader, SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import {
  GetRecipeDetailsQueryKey,
  RecipeForm,
  RecipesApi,
  usePublishRecipe,
  useRecipeDetails,
  useUnpublishRecipe,
} from '@fe/recipes';
import { RecipeId } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';
import {
  ListAllRecipesCategoriesQueryKey,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { IngredientsApi, ListIngredientsQueryKey } from '@fe/ingredients';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async ({ params }, queryClient, user) => {
    const recipeId: RecipeId = params?.recipeId as RecipeId;

    const httpClient = HttpClient.privateHttpClient(env().apiUrl, {
      accessToken: user.accessToken,
    });
    const recipesApi = new RecipesApi(httpClient);
    const recipesCategoriesApi = new RecipesCategoriesApi(httpClient);
    const ingredientsApi = new IngredientsApi(httpClient);

    await queryClient.prefetchQuery(GetRecipeDetailsQueryKey(recipeId), () =>
      recipesApi.getRecipeDetails(recipeId)
    );
    await queryClient.prefetchQuery(ListAllRecipesCategoriesQueryKey, () =>
      recipesCategoriesApi.listCategories({})
    );

    const ingredientsQueryDto = { name: '' };
    await queryClient.prefetchQuery(
      ListIngredientsQueryKey(ingredientsQueryDto),
      () => ingredientsApi.listIngredients(ingredientsQueryDto)
    );

    return { props: { recipeId } };
  })
);

interface EditYourRecipePageProps {
  recipeId: RecipeId;
}

export default function EditYourRecipePage({
  recipeId,
}: EditYourRecipePageProps) {
  const { redirectTo } = useRouting();

  const [recipe, loading, getRecipeError] = useRecipeDetails(recipeId);

  const [publishRecipe, publishRecipeLoading, publishRecipeError] =
    usePublishRecipe(recipeId, {
      onSuccess: () => redirectTo(routes.recipeDetails(recipeId)),
    });

  const [unpublishRecipe, unpublishRecipeLoading, unpublishRecipeError] =
    useUnpublishRecipe(recipeId, {
      onSuccess: () => redirectTo(routes.recipeDetails(recipeId)),
    });

  const error = publishRecipeError || unpublishRecipeError;

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
                (recipe.isPublished ? publishRecipe : unpublishRecipe)({
                  ...formValues,
                  ingredients:
                    formValues.ingredients &&
                    Object.values(formValues.ingredients),
                }),
              loading: recipe.isPublished
                ? publishRecipeLoading
                : unpublishRecipeLoading,
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
              cta: recipe.isPublished
                ? 'Zapisz i wycofaj publikacje'
                : 'Zapisz i opublikuj',
            }}
          />
        )}
      </main>
    </>
  );
}
