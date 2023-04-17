import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IIamApi } from './IamApi';

interface IIamApiContext {
  readonly iamApi: IIamApi;
}

const IamApiContext = createContext<Partial<IIamApiContext>>({});

export const IamApiProvider = ({
  children,
  ...props
}: PropsWithChildren<IIamApiContext>) => {
  return (
    <IamApiContext.Provider value={props}>{children}</IamApiContext.Provider>
  );
};

export const useIamApi = (): IIamApiContext => {
  const { iamApi } = useContext(IamApiContext);

  assertIsDefined(iamApi, 'IIamApiContext.iamApi must be defined!');

  return { iamApi };
};
