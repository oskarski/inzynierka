import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SignInForm } from '@fe/iam';
import { NotSignedInGuard } from '@fe/server/server-guards';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = NotSignedInGuard();

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Zaloguj się')}</title>
      </Head>

      <main>
        <SignInForm />
      </main>
    </>
  );
}
