import React, { PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { env, HttpClient } from '@fe/utils';
import {
  RecipesCategoriesProvider,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  const httpClient = useMemo(() => new HttpClient(env().apiUrl), []);

  const api = useMemo(
    () => ({
      recipesCategoriesApi: new RecipesCategoriesApi(httpClient),
    }),
    [httpClient]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecipesCategoriesProvider
        recipesCategoriesApi={api.recipesCategoriesApi}
      >
        {children}
      </RecipesCategoriesProvider>
    </QueryClientProvider>
  );
};
