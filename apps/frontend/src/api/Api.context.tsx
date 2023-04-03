import React, { PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { env, HttpClient } from '@fe/utils';
import {
  RecipesCategoriesProvider,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { IApi } from './Api.interface';
import { IamApi, IamProvider } from '@fe/iam';
import { IngredientsApi, IngredientsProvider } from '@fe/ingredients';

const defaultQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
});

interface ApiProviderProps {
  api?: IApi;
  queryClient?: QueryClient;
}

export const ApiProvider = ({
  api,
  queryClient = defaultQueryClient,
  children,
}: PropsWithChildren<ApiProviderProps>) => {
  const httpClient = useMemo(() => new HttpClient(env().apiUrl), []);

  const httpBasedApi = useMemo<IApi>(
    () => ({
      recipesCategoriesApi:
        api?.recipesCategoriesApi || new RecipesCategoriesApi(httpClient),
      iamApi: api?.iamApi || new IamApi(),
      ingredientsApi: api?.ingredientsApi || new IngredientsApi(httpClient),
    }),
    [httpClient, api]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <IamProvider iamApi={httpBasedApi.iamApi}>
        <RecipesCategoriesProvider
          recipesCategoriesApi={httpBasedApi.recipesCategoriesApi}
        >
          <IngredientsProvider ingredientsApi={httpBasedApi.ingredientsApi}>
            {children}
          </IngredientsProvider>
        </RecipesCategoriesProvider>
      </IamProvider>
    </QueryClientProvider>
  );
};
