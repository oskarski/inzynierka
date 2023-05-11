import { Loader } from '@fe/components';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { useListCategories } from '../api';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { assertIsDefined } from '@fe/utils';
import { RecipeCategoryCard } from './RecipeCategoryCard';
import { ApiErrorMessage } from '@fe/errors';

interface IRecipesCategoriesListingContext {
  recipesCategories: IRecipeCategoryListItemDto[];
}

const RecipesCategoriesListingContext = createContext<
  Partial<IRecipesCategoriesListingContext>
>({});

const useRecipesCategoriesListing = (): IRecipesCategoriesListingContext => {
  const { recipesCategories } = useContext(RecipesCategoriesListingContext);

  assertIsDefined(
    recipesCategories,
    'IRecipesCategoriesListingContext.recipesCategories must be defined!'
  );

  return { recipesCategories };
};

export const RecipesCategoriesListing = ({
  children,
}: PropsWithChildren<{}>) => {
  const [recipesCategories, loading, error] = useListCategories();

  if (loading) return <Loader />;
  if (error) return <ApiErrorMessage size="base" error={error} />;

  return (
    <RecipesCategoriesListingContext.Provider value={{ recipesCategories }}>
      {children}
    </RecipesCategoriesListingContext.Provider>
  );
};

RecipesCategoriesListing.CardList = function CardList() {
  const { recipesCategories } = useRecipesCategoriesListing();

  // TODO Empty state

  return (
    <>
      {recipesCategories.map((recipeCategory) => (
        <RecipeCategoryCard
          key={recipeCategory.id}
          recipeCategory={recipeCategory}
          className="mb-4"
        />
      ))}
    </>
  );
};
