import { Loader } from '@fe/components';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipeListItem, useListPaginatedRecipes } from '../api';
import { assertIsDefined } from '@fe/utils';
import { RecipeCard } from './RecipeCard';
import { ApiErrorMessage } from '@fe/errors';
import { InfiniteScroll } from 'antd-mobile';

interface IRecipesListingContext {
  recipes: IRecipeListItem[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

const RecipesListingContext = createContext<Partial<IRecipesListingContext>>(
  {}
);

const useRecipesListing = (): IRecipesListingContext => {
  const { recipes, hasMore, loadMore } = useContext(RecipesListingContext);

  assertIsDefined(recipes, 'IRecipesListingContext.recipes must be defined!');
  assertIsDefined(hasMore, 'IRecipesListingContext.hasMore must be defined!');
  assertIsDefined(loadMore, 'IRecipesListingContext.loadMore must be defined!');

  return { recipes, hasMore, loadMore };
};

export const RecipesListing = ({ children }: PropsWithChildren<{}>) => {
  const [recipes, loading, error, { loadMore, hasMore }] =
    useListPaginatedRecipes();

  if (loading) return <Loader />;
  if (error) return <ApiErrorMessage size="base" error={error} />;

  const ctx: IRecipesListingContext = {
    recipes,
    hasMore,
    loadMore,
  };

  return (
    <RecipesListingContext.Provider value={ctx}>
      {children}
    </RecipesListingContext.Provider>
  );
};

RecipesListing.CardList = function CardList() {
  const { recipes, hasMore, loadMore } = useRecipesListing();

  // TODO Empty state

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} className="mb-4" />
      ))}

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <Loader />
      </InfiniteScroll>
    </>
  );
};
