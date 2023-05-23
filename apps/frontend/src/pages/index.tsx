import Head from 'next/head';
import { headTitle, routes } from '@fe/utils';
import { Loader, ScrollableRow, SectionTitle } from '@fe/components';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../server/server-guards';
import { HydrateReactQueryState } from '../server/server-react-query';
import {
  EmptyMyRecipesList,
  RecipeCard,
  useConnectedCategories,
  useListMyRecipes,
} from '@fe/recipes';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';
import {
  RecipeCategoryCard,
  useListPopularCategories,
} from '@fe/recipes-categories';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{headTitle()}</title>
      </Head>

      <main>
        <SectionTitle href={routes.recipes()}>Popularne przepisy</SectionTitle>
        <div className="mb-6">POPULAR RECIPES WILL BE HERE</div>

        <PopularCategoriesSection />

        <MyRecipesSection />
      </main>
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
        <ScrollableRow className="space-x-3 -mr-4 pr-4 pb-2 pl-1">
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
