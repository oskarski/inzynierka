import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SignUpForm } from '@fe/iam';

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
