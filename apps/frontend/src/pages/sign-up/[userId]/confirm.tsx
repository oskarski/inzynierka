import Head from 'next/head';
import { headTitle, useRouting } from '@fe/utils';
import { NotSignedInGuard, SignUpConfirmForm } from '@fe/iam';
import { GetServerSideProps } from 'next';
import { UserId } from '@lib/shared';

export const getServerSideProps: GetServerSideProps = NotSignedInGuard();

export default function SignUpConfirmPage() {
  const { getQueryParam } = useRouting();

  const userIdQueryParam = getQueryParam<UserId>('userId');
  const emailQueryParam = getQueryParam('email');

  return (
    <>
      <Head>
        <title>{headTitle('Potwierdź Rejestrację')}</title>
      </Head>

      <main>
        {userIdQueryParam && emailQueryParam && (
          <SignUpConfirmForm
            userId={userIdQueryParam}
            email={atob(emailQueryParam)}
          />
        )}
      </main>
    </>
  );
}
