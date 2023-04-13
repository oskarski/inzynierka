import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IRecipesApi } from './index';

interface IRecipesApiContext {
  readonly recipesApi: IRecipesApi;
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
  const { recipesApi } = useContext(RecipesApiContext);

  assertIsDefined(recipesApi, 'IRecipesApiContext.recipesApi must be defined!');

  return { recipesApi };
};
