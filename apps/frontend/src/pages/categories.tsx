import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { RecipesCategoriesListing } from '@fe/recipes-categories';
import { SectionTitle } from '@fe/components';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '@fe/iam';

export const getServerSideProps: GetServerSideProps = SignedInGuard();

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
