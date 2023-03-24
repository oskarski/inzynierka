import React, { PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { env, HttpClient } from '@fe/utils';
import {
  RecipesCategoriesProvider,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { IApi } from './Api.interface';

const queryClient = new QueryClient();

interface ApiProviderProps {
  api?: IApi;
}

export const ApiProvider = ({
  api,
  children,
}: PropsWithChildren<ApiProviderProps>) => {
  const httpClient = useMemo(() => new HttpClient(env().apiUrl), []);

  const httpBasedApi = useMemo<IApi>(
    () => ({
      recipesCategoriesApi:
        api?.recipesCategoriesApi || new RecipesCategoriesApi(httpClient),
    }),
    [httpClient, api]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecipesCategoriesProvider
        recipesCategoriesApi={httpBasedApi.recipesCategoriesApi}
      >
        {children}
      </RecipesCategoriesProvider>
    </QueryClientProvider>
  );
};
