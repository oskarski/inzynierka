import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipesCategoriesApi } from './RecipesCategoriesApi';

interface IRecipesCategoriesApiContext {
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
}

const RecipesCategoriesApiContext = createContext<
  Partial<IRecipesCategoriesApiContext>
>({});

export const RecipesCategoriesApiProvider = ({
  children,
  ...props
}: PropsWithChildren<IRecipesCategoriesApiContext>) => {
  return (
    <RecipesCategoriesApiContext.Provider value={props}>
      {children}
    </RecipesCategoriesApiContext.Provider>
  );
};

export const useRecipesCategoriesApi = (): IRecipesCategoriesApiContext => {
  const { recipesCategoriesApi } = useContext(RecipesCategoriesApiContext);

  assertIsDefined(
    recipesCategoriesApi,
    'IRecipesCategoriesApiContext.recipesCategoriesApi must be defined!'
  );

  return { recipesCategoriesApi };
};
