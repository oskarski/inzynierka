import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientNotSignedInGuard, SignInForm } from '@fe/iam';

export default function SignInPage() {
  return (
    <ClientNotSignedInGuard>
      <Head>
        <title>{headTitle('Zaloguj się')}</title>
      </Head>

      <main>
        <SignInForm />
      </main>
    </ClientNotSignedInGuard>
  );
}
