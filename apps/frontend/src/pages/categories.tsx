import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { RecipesCategoriesListing } from '@fe/recipes-categories';
import { SectionTitle } from '@fe/components';
import { ClientSignedInGuard } from '@fe/iam';

export default function CategoriesPage() {
  return (
    <ClientSignedInGuard>
      <Head>
        <title>{headTitle('Kategorie')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Kategorie</SectionTitle>

        <RecipesCategoriesListing>
          <RecipesCategoriesListing.CardList />
        </RecipesCategoriesListing>
      </main>
    </ClientSignedInGuard>
  );
}
