import Head from 'next/head';
import { env, headTitle, HttpClient, routes } from '@fe/utils';
import { Loader, SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import { PlusSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  EmptyMyRecipesList,
  ListMyRecipesQueryKey,
  MyRecipesApi,
  RecipeCard,
  useConnectedCategories,
  useListMyRecipes,
} from '@fe/recipes';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async (ctx, queryClient, user) => {
    const myRecipesApi = new MyRecipesApi(
      HttpClient.privateHttpClient(env().apiUrl, {
        accessToken: user.accessToken,
      })
    );

    await queryClient.prefetchQuery(ListMyRecipesQueryKey, () =>
      myRecipesApi.listMyRecipes()
    );

    return { props: {} };
  })
);

export default function YourRecipesPage() {
  const [myRecipes, loading, error] = useListMyRecipes();

  const connectedCategories = useConnectedCategories();

  return (
    <>
      <Head>
        <title>{headTitle('Twoje przepisy')}</title>
      </Head>

      <main>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>Twoje przepisy</SectionTitle>

          <Link href={routes.createRecipe()}>
            <PlusSquareOutlined className="text-2xl" />
          </Link>
        </div>

        {loading && <Loader />}
        {error && <ApiErrorMessage size="base" error={error} />}

        {myRecipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            categories={connectedCategories(recipe)}
            showStateBadge={true}
            className="mb-4"
          />
        ))}

        {myRecipes && myRecipes.length === 0 && (
          <EmptyMyRecipesList className="mt-16" />
        )}
      </main>
    </>
  );
}
