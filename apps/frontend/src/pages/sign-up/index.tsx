import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { NotSignedInGuard, SignUpForm } from '@fe/iam';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = NotSignedInGuard();

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Rejestracja')}</title>
      </Head>

      <main>
        <SignUpForm />
      </main>
    </>
  );
}
