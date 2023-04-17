import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { RecipesListing } from '@fe/recipes';
import { ClientSignedInGuard } from '@fe/iam';

export default function RecipesPage() {
  return (
    <ClientSignedInGuard>
      <Head>
        <title>{headTitle('Przepisy')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Pasujące przepisy</SectionTitle>

        <RecipesListing>
          <RecipesListing.CardList />
        </RecipesListing>
      </main>
    </ClientSignedInGuard>
  );
}
