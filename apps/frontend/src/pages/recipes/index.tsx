import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { Loader, SectionTitle } from '@fe/components';
import {
  RecipeCard,
  useConnectedCategories,
  useListPaginatedRecipes,
  useRecipesFilters,
} from '@fe/recipes';
import { HydrateReactQueryState } from '../../server/server-react-query';
import { SignedInGuard } from '../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';
import { InfiniteScroll } from 'antd-mobile';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function RecipesPage() {
  const { selectedIngredients } = useRecipesFilters();

  const [recipes, loading, error, { loadMore, hasMore }] =
    useListPaginatedRecipes({
      ingredients: selectedIngredients.map((ingredient) => ({
        id: ingredient.id,
      })),
    });

  const connectedCategories = useConnectedCategories();

  return (
    <>
      <Head>
        <title>{headTitle('Przepisy')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Pasujące przepisy</SectionTitle>

        {loading && <Loader />}

        <ApiErrorMessage size="base" error={error} />

        {recipes && (
          <>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                categories={connectedCategories(recipe)}
                className="mb-4"
              />
            ))}

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
              <Loader />
            </InfiniteScroll>
          </>
        )}
      </main>
    </>
  );
}
