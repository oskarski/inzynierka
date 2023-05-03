import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipesApi } from './RecipesApi';
import { IFavouriteRecipesApi } from './FavouriteRecipesApi';
import { IMyRecipesApi } from './MyRecipesApi';

interface IRecipesApiContext {
  readonly recipesApi: IRecipesApi;
  readonly favouriteRecipesApi: IFavouriteRecipesApi;
  readonly myRecipesApi: IMyRecipesApi;
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
  const { recipesApi, favouriteRecipesApi, myRecipesApi } =
    useContext(RecipesApiContext);

  assertIsDefined(recipesApi, 'IRecipesApiContext.recipesApi must be defined!');
  assertIsDefined(
    favouriteRecipesApi,
    'IRecipesApiContext.favouriteRecipesApi must be defined!'
  );
  assertIsDefined(
    myRecipesApi,
    'IRecipesApiContext.myRecipesApi must be defined!'
  );

  return { recipesApi, favouriteRecipesApi, myRecipesApi };
};
