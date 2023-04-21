import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientNotSignedInGuard, SignUpForm } from '@fe/iam';
import { GetStaticProps } from 'next/types';
import { PublicPage } from '../../server/server-public-page';

export const getStaticProps: GetStaticProps = PublicPage();

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
