import Head from 'next/head';
import { env, headTitle, HttpClient } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../server/server-guards';
import { HydrateReactQueryState } from '../server/server-react-query';
import { Loader, SectionTitle } from '@fe/components';
import {
  EmptyFavouriteRecipesList,
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
      favouriteRecipesApi.listFavouriteRecipes().then((rec) => {
        console.log(rec);
        return rec;
      })
    );

    return { props: {} };
  })
);

export default function FavouriteRecipesPage() {
  const [favouriteRecipes, loading, error, all] = useListFavouriteRecipes();
  console.log(favouriteRecipes, all);
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

        {favouriteRecipes?.length === 0 && (
          <EmptyFavouriteRecipesList className="mt-16" />
        )}

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
