import Head from 'next/head';
import { headTitle } from '@fe/utils';

export default function FavouritePage() {
  return (
    <>
      <Head>
        <title>{headTitle('Lista zakupów')}</title>
      </Head>

      <main>FAVOURITE PAGE WILL BE HERE</main>
    </>
  );
}
