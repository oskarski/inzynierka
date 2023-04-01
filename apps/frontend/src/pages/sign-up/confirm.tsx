import Head from 'next/head';
import { headTitle, useRouting } from '@fe/utils';
import { SignUpConfirmForm } from '@fe/iam';

export default function SignUpConfirmPage() {
  const { getQueryParam } = useRouting();

  const emailQueryParam = getQueryParam('email');

  return (
    <>
      <Head>
        <title>{headTitle('Potwierdź Rejestrację')}</title>
      </Head>

      <main>
        {emailQueryParam && <SignUpConfirmForm email={atob(emailQueryParam)} />}
      </main>
    </>
  );
}
