import { Loader } from '@fe/components';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipeListItem, useFindRecipesPaginated } from '../api';
import { assertIsDefined } from '@fe/utils';
import { RecipeCard } from './RecipeCard';
import { ApiErrorMessage } from '@fe/errors';

interface IRecipesListingContext {
  recipes: IRecipeListItem[];
}

const RecipesListingContext = createContext<Partial<IRecipesListingContext>>(
  {}
);

const useRecipesListing = (): IRecipesListingContext => {
  const { recipes } = useContext(RecipesListingContext);

  assertIsDefined(recipes, 'IRecipesListingContext.recipes must be defined!');

  return { recipes };
};

export const RecipesListing = ({ children }: PropsWithChildren<{}>) => {
  const [paginatedRecipes, loading, error] = useFindRecipesPaginated(0);

  if (loading) return <Loader />;
  if (error) return <ApiErrorMessage size="base" error={error} />;

  return (
    <RecipesListingContext.Provider value={{ recipes: paginatedRecipes.data }}>
      {children}
    </RecipesListingContext.Provider>
  );
};

RecipesListing.CardList = function CardList() {
  const { recipes } = useRecipesListing();

  // TODO Empty state

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} className="mb-4" />
      ))}
    </>
  );
};
