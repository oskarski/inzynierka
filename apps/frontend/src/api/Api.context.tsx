import React, { PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { env, HttpClient } from '@fe/utils';
import {
  RecipesCategoriesProvider,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { IApi } from './Api.interface';
import { IamApi, IamProvider } from '@fe/iam';

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
      iamApi: api?.iamApi || new IamApi(),
    }),
    [httpClient, api]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <IamProvider iamApi={httpBasedApi.iamApi}>
        <RecipesCategoriesProvider
          recipesCategoriesApi={httpBasedApi.recipesCategoriesApi}
        >
          {children}
        </RecipesCategoriesProvider>
      </IamProvider>
    </QueryClientProvider>
  );
};
