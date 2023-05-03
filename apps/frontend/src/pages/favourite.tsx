import Head from 'next/head';
import { env, headTitle, HttpClient } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../server/server-guards';
import { HydrateReactQueryState } from '../server/server-react-query';
import { Loader, SectionTitle } from '@fe/components';
import {
  FavouriteRecipesApi,
  ListFavouriteRecipesQueryKey,
  RecipeCard,
  useConnectedCategories,
  useListFavouriteRecipes,
} from '@fe/recipes';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async (ctx, queryClient, user) => {
    const favouriteRecipesApi = new FavouriteRecipesApi(
      HttpClient.privateHttpClient(env().apiUrl, {
        accessToken: user.accessToken,
      })
    );

    await queryClient.prefetchQuery(ListFavouriteRecipesQueryKey, () =>
      favouriteRecipesApi.listFavouriteRecipes()
    );

    return { props: {} };
  })
);

export default function FavouriteRecipesPage() {
  const [favouriteRecipes, loading, error] = useListFavouriteRecipes();

  const connectedCategories = useConnectedCategories();

  return (
    <>
      <Head>
        <title>{headTitle('Ulubione Przepisy')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Ulubione przepisy</SectionTitle>

        {loading && <Loader />}
        {error && <ApiErrorMessage size="base" error={error} />}

        {favouriteRecipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            categories={connectedCategories(recipe)}
            className="mb-4"
          />
        ))}
      </main>
    </>
  );
}
