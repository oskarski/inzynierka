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
import {
  ListAllRecipesCategoriesQueryKey,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async (ctx, queryClient, user) => {
    const httpClient = HttpClient.privateHttpClient(env().apiUrl, {
      accessToken: user.accessToken,
    });

    const favouriteRecipesApi = new FavouriteRecipesApi(httpClient);
    const recipesCategoriesApi = new RecipesCategoriesApi(httpClient);

    await queryClient.prefetchQuery(ListFavouriteRecipesQueryKey, () =>
      favouriteRecipesApi.listFavouriteRecipes()
    );
    await queryClient.prefetchQuery(ListAllRecipesCategoriesQueryKey, () =>
      recipesCategoriesApi.listCategories({})
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

        {(favouriteRecipes?.length === 0 ||
          (!loading && !favouriteRecipes)) && (
          <EmptyFavouriteRecipesList className="mt-16" />
        )}

        {favouriteRecipes && (
          <div className="sm:flex sm:flex-wrap sm:-mx-2 sm:px-2">
            {favouriteRecipes.map((recipe) => (
              <div className="mb-4 sm:w-1/2 lg:w-1/3 sm:px-2">
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  categories={connectedCategories(recipe)}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
