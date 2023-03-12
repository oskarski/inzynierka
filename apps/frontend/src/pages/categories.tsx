import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { RecipeCategoryCard } from '@fe/recipes-categories';
import { SectionTitle } from '@fe/components';

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Kategorie')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Kategorie</SectionTitle>

        <RecipeCategoryCard className="mb-4" />

        <RecipeCategoryCard className="mb-4" />

        <RecipeCategoryCard className="mb-4" />
      </main>
    </>
  );
}
