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

        <SectionTitle href={routes.categories()}>
          Popularne kategorie
        </SectionTitle>
        <div className="mb-6">POPULAR CATEGORIES WILL BE HERE</div>

        <MyRecipesSection />
      </main>
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
            <div className="min-w-70">
              <RecipeCard
                key={recipe.id}
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
