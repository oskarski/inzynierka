import React, { PropsWithChildren } from 'react';
import { ApiProvider, IApi } from '@fe/api';

interface AppProviderProps {
  api?: IApi;
}

export const AppProvider = ({
  api,
  children,
}: PropsWithChildren<AppProviderProps>) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};
