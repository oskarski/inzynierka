import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { Loader, SectionTitle } from '@fe/components';
import {
  EmptyRecipesList,
  RecipeCard,
  RecipeFiltersButton,
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
import { FrownOutlined } from '@ant-design/icons';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function RecipesPage() {
  const { selectedIngredients, filters } = useRecipesFilters();

  const [recipes, loading, error, { loadMore, hasMore }, { isFetching }] =
    useListPaginatedRecipes({
      ingredients: selectedIngredients.map((ingredient) => ({
        id: ingredient.id,
      })),
      ...filters,
    });

  const connectedCategories = useConnectedCategories();

  return (
    <>
      <Head>
        <title>{headTitle('Przepisy')}</title>
      </Head>

      <main>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>Pasujące przepisy</SectionTitle>

          <RecipeFiltersButton />
        </div>

        {loading && <Loader />}

        <ApiErrorMessage size="base" error={error} />

        {!loading && (!recipes || recipes.length === 0) && (
          <EmptyRecipesList className="mt-16" />
        )}

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
              {isFetching && <Loader />}
            </InfiniteScroll>
          </>
        )}
      </main>
    </>
  );
}
