import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientSignedInGuard } from '@fe/iam';

export default function ShoppingListPage() {
  return (
    <ClientSignedInGuard>
      <Head>
        <title>{headTitle('Lista zakupów')}</title>
      </Head>

      <main>SHOPPING LIST PAGE WILL BE HERE</main>
    </ClientSignedInGuard>
  );
}
