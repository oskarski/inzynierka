import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '@fe/server/server-guards';

export const getServerSideProps: GetServerSideProps = SignedInGuard();

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
