import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '@fe/iam';
import { RecipesListing } from '@fe/recipes';

export const getServerSideProps: GetServerSideProps = SignedInGuard();

export default function RecipesPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Przepisy')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Pasujące przepisy</SectionTitle>

        <RecipesListing>
          <RecipesListing.CardList />
        </RecipesListing>
      </main>
    </>
  );
}
