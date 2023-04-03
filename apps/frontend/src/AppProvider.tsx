import React, { PropsWithChildren } from 'react';
import { ApiProvider, IApi } from '@fe/api';
import { QueryClient } from 'react-query';

interface AppProviderProps {
  api?: IApi;
  queryClient?: QueryClient;
}

export const AppProvider = ({
  api,
  children,
}: PropsWithChildren<AppProviderProps>) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};
