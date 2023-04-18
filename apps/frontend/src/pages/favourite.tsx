import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../server/server-guards';
import { HydrateReactQueryState } from '../server/server-react-query';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

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
