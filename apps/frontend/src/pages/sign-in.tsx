import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ClientNotSignedInGuard, SignInForm } from '@fe/iam';
import { GetStaticProps } from 'next/types';
import { PublicPage } from '../server/server-public-page';
import { SectionTitle } from '@fe/components';

export const getStaticProps: GetStaticProps = PublicPage();

export default function SignInPage() {
  return (
    <ClientNotSignedInGuard>
      <Head>
        <title>{headTitle('Zaloguj się')}</title>
      </Head>

      <main>
        <div className="mx-auto sm:mt-10 sm:max-w-md">
          <SectionTitle className="mb-6">Zaloguj się</SectionTitle>

          <SignInForm />
        </div>
      </main>
    </ClientNotSignedInGuard>
  );
}
