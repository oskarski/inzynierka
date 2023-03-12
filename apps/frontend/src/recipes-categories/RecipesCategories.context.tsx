import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipesCategoriesApi } from './api';

interface IRecipesCategoriesContext {
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
}

const RecipesCategoriesContext = createContext<
  Partial<IRecipesCategoriesContext>
>({});

export const RecipesCategoriesProvider = ({
  children,
  ...props
}: PropsWithChildren<IRecipesCategoriesContext>) => {
  return (
    <RecipesCategoriesContext.Provider value={props}>
      {children}
    </RecipesCategoriesContext.Provider>
  );
};

export const useRecipesCategories = (): IRecipesCategoriesContext => {
  const { recipesCategoriesApi } = useContext(RecipesCategoriesContext);

  assertIsDefined(
    recipesCategoriesApi,
    'IRecipesCategoriesContext.recipesCategoriesApi must be defined!'
  );

  return { recipesCategoriesApi };
};
