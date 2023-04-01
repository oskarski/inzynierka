import { useRouter } from 'next/router';

export const useRouting = () => {
  const router = useRouter();

  return {
    redirectTo: router.push,
  };
};

export const routes = {
  home: () => '/',

  recipes: () => '/recipes',

  shoppingList: () => '/shopping-list',

  categories: () => '/categories',

  favourite: () => '/favourite',

  signUp: () => '/sign-up',

  signUpConfirm: () => '/sign-up/confirm',
};
