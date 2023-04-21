import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientNotSignedInGuard, SignInForm } from '@fe/iam';
import { GetStaticProps } from 'next/types';
import { PublicPage } from '../server/server-public-page';

export const getStaticProps: GetStaticProps = PublicPage();

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
