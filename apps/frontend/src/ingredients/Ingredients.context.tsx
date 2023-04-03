import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IIngredientsApi } from './api';

interface IIngredientsContext {
  readonly ingredientsApi: IIngredientsApi;
}

const IngredientsContext = createContext<Partial<IIngredientsContext>>({});

export const IngredientsProvider = ({
  children,
  ...props
}: PropsWithChildren<IIngredientsContext>) => {
  return (
    <IngredientsContext.Provider value={props}>
      {children}
    </IngredientsContext.Provider>
  );
};

export const useIngredients = (): IIngredientsContext => {
  const { ingredientsApi } = useContext(IngredientsContext);

  assertIsDefined(
    ingredientsApi,
    'IIngredientsContext.ingredientsApi must be defined!'
  );

  return { ingredientsApi };
};
