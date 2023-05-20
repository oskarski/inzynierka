import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientNotSignedInGuard, SignUpForm } from '@fe/iam';
import { GetStaticProps } from 'next/types';
import { PublicPage } from '../../server/server-public-page';
import { SectionTitle } from '@fe/components';

export const getStaticProps: GetStaticProps = PublicPage();

export default function SignUpPage() {
  return (
    <ClientNotSignedInGuard>
      <Head>
        <title>{headTitle('Rejestracja')}</title>
      </Head>

      <main>
        <div className="mx-auto sm:mt-10 sm:max-w-md">
          <SectionTitle className="mb-6">Rejestracja</SectionTitle>

          <SignUpForm />
        </div>
      </main>
    </ClientNotSignedInGuard>
  );
}
