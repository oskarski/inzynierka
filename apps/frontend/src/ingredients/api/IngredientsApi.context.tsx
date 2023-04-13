import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IIngredientsApi } from './IngredientsApi';

interface IIngredientsApiContext {
  readonly ingredientsApi: IIngredientsApi;
}

const IngredientsApiContext = createContext<Partial<IIngredientsApiContext>>(
  {}
);

export const IngredientsApiProvider = ({
  children,
  ...props
}: PropsWithChildren<IIngredientsApiContext>) => {
  return (
    <IngredientsApiContext.Provider value={props}>
      {children}
    </IngredientsApiContext.Provider>
  );
};

export const useIngredientsApi = (): IIngredientsApiContext => {
  const { ingredientsApi } = useContext(IngredientsApiContext);

  assertIsDefined(
    ingredientsApi,
    'IIngredientsApiContext.ingredientsApi must be defined!'
  );

  return { ingredientsApi };
};
