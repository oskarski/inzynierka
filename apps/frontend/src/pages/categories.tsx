import Head from 'next/head';
import { env, headTitle, HttpClient } from '@fe/utils';
import {
  ListAllRecipesCategoriesQueryKey,
  RecipesCategoriesApi,
  RecipesCategoriesListing,
} from '@fe/recipes-categories';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../server/server-react-query';
import { SignedInGuard } from '../server/server-guards';
import { GetServerSideProps } from 'next/types';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async (ctx, queryClient, user) => {
    const recipesCategoriesApi = new RecipesCategoriesApi(
      HttpClient.privateHttpClient(env().apiUrl, {
        accessToken: user.accessToken,
      })
    );

    await queryClient.prefetchQuery(ListAllRecipesCategoriesQueryKey, () =>
      recipesCategoriesApi.listAllCategories()
    );

    return { props: {} };
  })
);

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Kategorie')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Kategorie</SectionTitle>

        <RecipesCategoriesListing>
          <RecipesCategoriesListing.CardList />
        </RecipesCategoriesListing>
      </main>
    </>
  );
}
