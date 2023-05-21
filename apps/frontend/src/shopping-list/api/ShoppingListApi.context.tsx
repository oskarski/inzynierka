import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IShoppingListApi } from './ShoppingListApi';

interface IShoppingListApiContext {
  readonly shoppingListApi: IShoppingListApi;
}

const ShoppingListApiContext = createContext<Partial<IShoppingListApiContext>>(
  {}
);

export const ShoppingListApiProvider = ({
  children,
  ...props
}: PropsWithChildren<IShoppingListApiContext>) => {
  return (
    <ShoppingListApiContext.Provider value={props}>
      {children}
    </ShoppingListApiContext.Provider>
  );
};

export const useShoppingListApi = (): IShoppingListApiContext => {
  const { shoppingListApi } = useContext(ShoppingListApiContext);

  assertIsDefined(
    shoppingListApi,
    'IShoppingListApiContext.shoppingListApi must be defined!'
  );

  return { shoppingListApi };
};
