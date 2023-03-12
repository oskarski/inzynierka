import React, { PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { env, HttpClient } from '@fe/utils';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  const httpClient = useMemo(() => new HttpClient(env().apiUrl), []);

  const api = useMemo(() => ({}), [httpClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
