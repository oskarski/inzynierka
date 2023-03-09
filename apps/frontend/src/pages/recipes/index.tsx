import Head from 'next/head';
import { headTitle } from '@fe/utils';

export default function RecipesPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Przepisy')}</title>
      </Head>

      <main>RECIPES PAGE WILL BE HERE</main>
    </>
  );
}
