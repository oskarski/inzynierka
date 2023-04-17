import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientSignedInGuard } from '@fe/iam';

export default function FavouritePage() {
  return (
    <ClientSignedInGuard>
      <Head>
        <title>{headTitle('Lista zakupów')}</title>
      </Head>

      <main>FAVOURITE PAGE WILL BE HERE</main>
    </ClientSignedInGuard>
  );
}
