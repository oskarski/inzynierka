import { Loader } from '@fe/components';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import {
  IRecipeListItem,
  useConnectedCategories,
  useListPaginatedRecipes,
} from '../api';
import { assertIsDefined } from '@fe/utils';
import { RecipeCard } from './RecipeCard';
import { ApiErrorMessage } from '@fe/errors';
import { InfiniteScroll } from 'antd-mobile';
import { IRecipeCategoryListItemDto } from '@lib/shared';

interface IRecipesListingContext {
  recipes: IRecipeListItem[];
  hasMore: boolean;
  loadMore: () => Promise<void>;
  connectedCategories: (
    recipe: IRecipeListItem
  ) => IRecipeCategoryListItemDto[];
}

const RecipesListingContext = createContext<Partial<IRecipesListingContext>>(
  {}
);

const useRecipesListing = (): IRecipesListingContext => {
  const { recipes, hasMore, loadMore, connectedCategories } = useContext(
    RecipesListingContext
  );

  assertIsDefined(recipes, 'IRecipesListingContext.recipes must be defined!');
  assertIsDefined(hasMore, 'IRecipesListingContext.hasMore must be defined!');
  assertIsDefined(loadMore, 'IRecipesListingContext.loadMore must be defined!');
  assertIsDefined(
    connectedCategories,
    'IRecipesListingContext.connectedCategories must be defined!'
  );

  return { recipes, hasMore, loadMore, connectedCategories };
};

export const RecipesListing = ({ children }: PropsWithChildren<{}>) => {
  const [recipes, loading, error, { loadMore, hasMore }] =
    useListPaginatedRecipes();

  const connectedCategories = useConnectedCategories();

  if (loading || !recipes) return <Loader />;
  if (error) return <ApiErrorMessage size="base" error={error} />;

  const ctx: IRecipesListingContext = {
    recipes,
    hasMore,
    loadMore,
    connectedCategories,
  };

  return (
    <RecipesListingContext.Provider value={ctx}>
      {children}
    </RecipesListingContext.Provider>
  );
};

RecipesListing.CardList = function CardList() {
  const { recipes, hasMore, loadMore, connectedCategories } =
    useRecipesListing();

  // TODO Empty state

  return (
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
  );
};
