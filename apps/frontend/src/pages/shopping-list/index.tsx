import Head from 'next/head';
import { headTitle } from '@fe/utils';

export default function ShoppingListPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Lista zakupów')}</title>
      </Head>

      <main>SHOPPING LIST PAGE WILL BE HERE</main>
    </>
  );
}
