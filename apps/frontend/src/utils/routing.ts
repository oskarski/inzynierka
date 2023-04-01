import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useRouting = () => {
  const router = useRouter();

  const getQueryParam = useCallback(
    (queryName: string) => {
      const queryParam = router.query[queryName];

      if (!queryParam) return null;
      if (Array.isArray(queryParam)) return null;

      return decodeURI(queryParam);
    },
    [router.query]
  );

  return {
    redirectTo: router.push,
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

  signUpConfirm: (email: string) =>
    `/sign-up/confirm?email=${encodeURI(email)}`,

  signIn: () => '/sign-in',
};
