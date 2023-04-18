import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { RecipesListing } from '@fe/recipes';
import { HydrateReactQueryState } from '../../server/server-react-query';
import { SignedInGuard } from '../../server/server-guards';
import { GetServerSideProps } from 'next/types';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

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
