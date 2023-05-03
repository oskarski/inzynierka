import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipesApi } from './RecipesApi';
import { IFavouriteRecipesApi } from './FavouriteRecipesApi';

interface IRecipesApiContext {
  readonly recipesApi: IRecipesApi;
  readonly favouriteRecipesApi: IFavouriteRecipesApi;
}

const RecipesApiContext = createContext<Partial<IRecipesApiContext>>({});

export const RecipesApiProvider = ({
  children,
  ...props
}: PropsWithChildren<IRecipesApiContext>) => {
  return (
    <RecipesApiContext.Provider value={props}>
      {children}
    </RecipesApiContext.Provider>
  );
};

export const useRecipesApi = (): IRecipesApiContext => {
  const { recipesApi, favouriteRecipesApi } = useContext(RecipesApiContext);

  assertIsDefined(recipesApi, 'IRecipesApiContext.recipesApi must be defined!');
  assertIsDefined(
    favouriteRecipesApi,
    'IRecipesApiContext.favouriteRecipesApi must be defined!'
  );

  return { recipesApi, favouriteRecipesApi };
};
