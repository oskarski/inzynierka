import React, { PropsWithChildren, useMemo } from 'react';
import { env, HttpClient } from '@fe/utils';
import {
  RecipesCategoriesApiProvider,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { IApi } from './Api.interface';
import {
  IamApi,
  IamApiProvider,
  useRefreshSession,
  useSignedInUser,
  useSignOut,
} from '@fe/iam';
import { IngredientsApi, IngredientsApiProvider } from '@fe/ingredients';
import { RecipesApi, RecipesApiProvider } from '@fe/recipes';

const publicHttpClient = HttpClient.publicHttpClient(env().apiUrl);

interface ApiProviderProps {
  api?: IApi;
}

export const ApiProvider = ({
  api,
  children,
}: PropsWithChildren<ApiProviderProps>) => {
  const iamApi = useMemo(
    () => api?.iamApi || new IamApi(publicHttpClient),
    [api]
  );

  return (
    <IamApiProvider iamApi={iamApi}>
      <PrivateApiProvider api={api}>{children}</PrivateApiProvider>
    </IamApiProvider>
  );
};

function PrivateApiProvider({
  api,
  children,
}: PropsWithChildren<{
  api?: IApi;
}>) {
  const [signedInUser] = useSignedInUser();
  const signOut = useSignOut();
  const refreshSession = useRefreshSession(signOut);

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
