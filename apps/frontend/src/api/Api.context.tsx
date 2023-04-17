import React, { PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { env, HttpClient } from '@fe/utils';
import {
  RecipesCategoriesApiProvider,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { IApi } from './Api.interface';
import { IamApi, IamApiProvider, IamProvider, useIam } from '@fe/iam';
import { IngredientsApi, IngredientsApiProvider } from '@fe/ingredients';
import { RecipesApi, RecipesApiProvider } from '@fe/recipes';

const defaultQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
});

const publicHttpClient = HttpClient.publicHttpClient(env().apiUrl);

interface ApiProviderProps {
  api?: IApi;
  queryClient?: QueryClient;
}

export const ApiProvider = ({
  api,
  queryClient = defaultQueryClient,
  children,
}: PropsWithChildren<ApiProviderProps>) => {
  const iamApi = useMemo(
    () => api?.iamApi || new IamApi(publicHttpClient),
    [api]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <IamApiProvider iamApi={iamApi}>
        <IamProvider>
          <PrivateApiProvider api={api}>{children}</PrivateApiProvider>
        </IamProvider>
      </IamApiProvider>
    </QueryClientProvider>
  );
};

function PrivateApiProvider({
  api,
  children,
}: PropsWithChildren<{
  api?: IApi;
}>) {
  const { signedInUser, refreshSession } = useIam();

  const httpBasedApi = useMemo(() => {
    if (!signedInUser) return null;

    const httpClient = HttpClient.privateHttpClient(env().apiUrl, {
      accessToken: signedInUser.accessToken,
      onUnauthorized: refreshSession,
    });

    return {
      recipesCategoriesApi:
        api?.recipesCategoriesApi || new RecipesCategoriesApi(httpClient),
      ingredientsApi: api?.ingredientsApi || new IngredientsApi(httpClient),
      recipesApi: api?.recipesApi || new RecipesApi(httpClient),
    };
  }, [api, signedInUser]);

  if (!httpBasedApi) return <>{children}</>;

  return (
    <RecipesCategoriesApiProvider
      recipesCategoriesApi={httpBasedApi.recipesCategoriesApi}
    >
      <IngredientsApiProvider ingredientsApi={httpBasedApi.ingredientsApi}>
        <RecipesApiProvider recipesApi={httpBasedApi.recipesApi}>
          {children}
        </RecipesApiProvider>
      </IngredientsApiProvider>
    </RecipesCategoriesApiProvider>
  );
}
