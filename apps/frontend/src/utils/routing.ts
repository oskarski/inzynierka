import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { RecipeId } from '@lib/shared';

export const useRouting = () => {
  const router = useRouter();

  const getQueryParam = useCallback(
    function <T extends string>(queryName: string): T | null {
      const queryParam = router.query[queryName];

      if (!queryParam) return null;
      if (Array.isArray(queryParam)) return null;

      return decodeURI(queryParam) as T;
    },
    [router.query]
  );

  const redirectTo = useCallback(
    async (url: string) => {
      if (router.route !== url) await router.push(url);
    },
    [router.route]
  );

  return {
    redirectTo,
    getQueryParam,
    currentRoute: router.route,
  };
};

export const routes = {
  home: () => '/',

  recipes: () => '/recipes',

  recipeDetails: (recipeId: RecipeId) => `/recipes/${recipeId}`,

  shoppingList: () => '/shopping-list',

  categories: () => '/categories',

  favourite: () => '/favourite',

  yourRecipes: () => '/me/recipes',

  createRecipe: () => '/me/recipes/create',

  editRecipe: (recipeId: RecipeId) => `/me/recipes/${recipeId}`,

  signUp: () => '/sign-up',

  signUpConfirm: (userId: string, email: string) =>
    `/sign-up/${userId}/confirm?email=${encodeURI(email)}`,

  signIn: () => '/sign-in',

  forgotPassword: () => '/forgot-password',

  forgotPasswordConfirm: (email: string) =>
    `/forgot-password/confirm?email=${encodeURI(email)}`,
};
