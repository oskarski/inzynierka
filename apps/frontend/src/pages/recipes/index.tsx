import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { RecipeCard } from '@fe/recipes';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '@fe/iam';

export const getServerSideProps: GetServerSideProps = SignedInGuard();

export default function RecipesPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Przepisy')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Pasujące przepisy</SectionTitle>

        <RecipeCard className="mb-6" />

        <RecipeCard className="mb-6" />

        <RecipeCard className="mb-6" />
      </main>
    </>
  );
}
