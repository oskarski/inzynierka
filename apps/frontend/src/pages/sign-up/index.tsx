import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientNotSignedInGuard, SignUpForm } from '@fe/iam';

export default function SignUpPage() {
  return (
    <ClientNotSignedInGuard>
      <Head>
        <title>{headTitle('Rejestracja')}</title>
      </Head>

      <main>
        <SignUpForm />
      </main>
    </ClientNotSignedInGuard>
  );
}
