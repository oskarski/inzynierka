import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { RecipesCategoriesListing } from '@fe/recipes-categories';
import { SectionTitle } from '@fe/components';

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
