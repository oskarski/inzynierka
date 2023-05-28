import Head from 'next/head';
import { env, headTitle, HttpClient, routes } from '@fe/utils';
import { Loader, ScrollableRow, SectionTitle } from '@fe/components';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../server/server-guards';
import { HydrateReactQueryState } from '../server/server-react-query';
import {
  EmptyMyRecipesList,
  FavouriteRecipesApi,
  ListFavouriteRecipesQueryKey,
  ListMyRecipesQueryKey,
  ListPopularRecipesQueryKey,
  MyRecipesApi,
  RecipeCard,
  RecipesApi,
  useConnectedCategories,
  useListMyRecipes,
  useListPopularRecipes,
} from '@fe/recipes';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';
import {
  ListAllRecipesCategoriesQueryKey,
  ListPopularCategoriesQueryKey,
  RecipeCategoryCard,
  RecipesCategoriesApi,
  useListPopularCategories,
} from '@fe/recipes-categories';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async (ctx, queryClient, user) => {
    const httpClient = HttpClient.privateHttpClient(env().apiUrl, {
      accessToken: user.accessToken,
    });

    const recipesApi = new RecipesApi(httpClient);
    const myRecipesApi = new MyRecipesApi(httpClient);
    const favouriteRecipesApi = new FavouriteRecipesApi(httpClient);
    const recipesCategoriesApi = new RecipesCategoriesApi(httpClient);

    await queryClient.prefetchQuery(ListPopularRecipesQueryKey, () =>
      recipesApi.listPopularRecipes()
    );
    await queryClient.prefetchQuery(ListFavouriteRecipesQueryKey, () =>
      favouriteRecipesApi.listFavouriteRecipes()
    );
    await queryClient.prefetchQuery(ListMyRecipesQueryKey, () =>
      myRecipesApi.listMyRecipes()
    );
    await queryClient.prefetchQuery(ListAllRecipesCategoriesQueryKey, () =>
      recipesCategoriesApi.listCategories({})
    );
    await queryClient.prefetchQuery(ListPopularCategoriesQueryKey, () =>
      recipesCategoriesApi.listPopularCategories()
    );

    return { props: {} };
  })
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{headTitle()}</title>
      </Head>

      <main>
        <PopularRecipesSection />

        <PopularCategoriesSection />

        <MyRecipesSection />
      </main>
    </>
  );
}

function PopularRecipesSection() {
  const [popularRecipes, loading, error] = useListPopularRecipes();

  const connectedCategories = useConnectedCategories();

  if (popularRecipes && popularRecipes.length === 0) return null;

  return (
    <>
      <SectionTitle href={routes.recipes()} className="mb-4">
        Popularne przepisy
      </SectionTitle>

      {loading && <Loader />}
      {error && <ApiErrorMessage size="base" error={error} />}

      {popularRecipes && (
        <ScrollableRow className="space-x-3 -mr-4 pr-4 pb-2 pl-1 mb-6">
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className="min-w-70">
              <RecipeCard
                recipe={recipe}
                categories={connectedCategories(recipe)}
                className="h-full"
                showDescription={false}
              />
            </div>
          ))}
        </ScrollableRow>
      )}
    </>
  );
}

function PopularCategoriesSection() {
  const [popularCategories, loading, error] = useListPopularCategories();

  return (
    <>
      <SectionTitle href={routes.categories()} className="mb-4">
        Popularne kategorie
      </SectionTitle>

      {loading && <Loader />}
      {error && <ApiErrorMessage size="base" error={error} />}

      {popularCategories && popularCategories.length > 0 && (
        <ScrollableRow className="space-x-3 -mr-4 pr-4 pb-2 pl-1 mb-6">
          {popularCategories.map((category) => (
            <div key={category.id} className="min-w-70">
              <RecipeCategoryCard recipeCategory={category} className="mb-4" />
            </div>
          ))}
        </ScrollableRow>
      )}
    </>
  );
}

function MyRecipesSection() {
  const [myRecipes, loading, error] = useListMyRecipes();

  const connectedCategories = useConnectedCategories();

  return (
    <>
      <SectionTitle href={routes.yourRecipes()} className="mb-4">
        Twoje przepisy
      </SectionTitle>

      {loading && <Loader />}
      {error && <ApiErrorMessage size="base" error={error} />}

      {myRecipes && myRecipes.length > 0 && (
        <ScrollableRow className="space-x-3 -mr-4 pr-4 pb-2 pl-1">
          {myRecipes.map((recipe) => (
            <div key={recipe.id} className="min-w-70">
              <RecipeCard
                recipe={recipe}
                categories={connectedCategories(recipe)}
                className="h-full"
              />
            </div>
          ))}
        </ScrollableRow>
      )}

      {myRecipes && myRecipes.length === 0 && <EmptyMyRecipesList />}
    </>
  );
}
