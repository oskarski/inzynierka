import React, { PropsWithChildren } from 'react';
import { ApiProvider, IApi } from '@fe/api';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecipesFiltersProvider } from '@fe/recipes';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
});

interface AppProviderProps {
  api?: IApi;
  queryClient?: QueryClient;
  dehydratedReactQueryState?: unknown;
}

export const AppProvider = ({
  api,
  dehydratedReactQueryState,
  children,
}: PropsWithChildren<AppProviderProps>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedReactQueryState}>
        <ApiProvider api={api}>
          <RecipesFiltersProvider>{children}</RecipesFiltersProvider>
        </ApiProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};
