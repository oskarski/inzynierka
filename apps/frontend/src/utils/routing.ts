import { useRouter } from 'next/router';
import { useCallback } from 'react';

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

  shoppingList: () => '/shopping-list',

  categories: () => '/categories',

  favourite: () => '/favourite',

  signUp: () => '/sign-up',

  signUpConfirm: (userId: string, email: string) =>
    `/sign-up/${userId}/confirm?email=${encodeURI(email)}`,

  signIn: () => '/sign-in',
};
