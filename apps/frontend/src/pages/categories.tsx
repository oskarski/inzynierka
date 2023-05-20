import Head from 'next/head';
import { env, headTitle, HttpClient } from '@fe/utils';
import {
  ListAllRecipesCategoriesQueryKey,
  RecipeCategoryCard,
  RecipesCategoriesApi,
  useListCategories,
} from '@fe/recipes-categories';
import { Loader, SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../server/server-react-query';
import { SignedInGuard } from '../server/server-guards';
import { GetServerSideProps } from 'next/types';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async (ctx, queryClient, user) => {
    const recipesCategoriesApi = new RecipesCategoriesApi(
      HttpClient.privateHttpClient(env().apiUrl, {
        accessToken: user.accessToken,
      })
    );

    await queryClient.prefetchQuery(ListAllRecipesCategoriesQueryKey, () =>
      recipesCategoriesApi.listCategories({})
    );

    return { props: {} };
  })
);

export default function CategoriesPage() {
  const [recipesCategories, loading, error] = useListCategories();

  return (
    <>
      <Head>
        <title>{headTitle('Kategorie')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Kategorie</SectionTitle>

        {loading && <Loader />}
        {error && <ApiErrorMessage size="base" error={error} />}

        {recipesCategories &&
          recipesCategories.map((recipeCategory) => (
            <RecipeCategoryCard
              key={recipeCategory.id}
              recipeCategory={recipeCategory}
              className="mb-4"
            />
          ))}
      </main>
    </>
  );
}
