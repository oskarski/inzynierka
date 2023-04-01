import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SignInForm } from '@fe/iam';

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
