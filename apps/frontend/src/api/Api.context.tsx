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
import {
  FavouriteRecipesApi,
  MyRecipesApi,
  RecipesApi,
  RecipesApiProvider,
} from '@fe/recipes';
import { ShoppingListApi, ShoppingListApiProvider } from '@fe/shopping-list';
import { ReviewsApi, ReviewsApiProvider } from '@fe/reviews';

const publicHttpClient = HttpClient.publicHttpClient(env().apiUrl);

interface ApiProviderProps {
  api?: IApi;
  isPublicPage: boolean;
}

export const ApiProvider = ({
  api,
  isPublicPage,
  children,
}: PropsWithChildren<ApiProviderProps>) => {
  const iamApi = useMemo(
    () => api?.iamApi || new IamApi(publicHttpClient),
    [api]
  );

  return (
    <IamApiProvider iamApi={iamApi}>
      <PrivateApiProvider api={api} passThrough={isPublicPage}>
        {children}
      </PrivateApiProvider>
    </IamApiProvider>
  );
};

function PrivateApiProvider({
  api,
  passThrough,
  children,
}: PropsWithChildren<{
  api?: IApi;
  passThrough: boolean;
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
      favouriteRecipesApi:
        api?.favouriteRecipesApi || new FavouriteRecipesApi(httpClient),
      myRecipesApi: api?.myRecipesApi || new MyRecipesApi(httpClient),
      shoppingListApi: api?.shoppingListApi || new ShoppingListApi(httpClient),
      reviewsApi: api?.reviewsApi || new ReviewsApi(httpClient),
    };
  }, [api, signedInUser]);

  if (!httpBasedApi) return passThrough ? <>{children}</> : null;

  return (
    <RecipesCategoriesApiProvider
      recipesCategoriesApi={httpBasedApi.recipesCategoriesApi}
    >
      <IngredientsApiProvider ingredientsApi={httpBasedApi.ingredientsApi}>
        <RecipesApiProvider
          recipesApi={httpBasedApi.recipesApi}
          favouriteRecipesApi={httpBasedApi.favouriteRecipesApi}
          myRecipesApi={httpBasedApi.myRecipesApi}
        >
          <ShoppingListApiProvider
            shoppingListApi={httpBasedApi.shoppingListApi}
          >
            <ReviewsApiProvider reviewsApi={httpBasedApi.reviewsApi}>
              {children}
            </ReviewsApiProvider>
          </ShoppingListApiProvider>
        </RecipesApiProvider>
      </IngredientsApiProvider>
    </RecipesCategoriesApiProvider>
  );
}
