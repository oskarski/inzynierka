import Head from 'next/head';
import { headTitle, useRouting } from '@fe/utils';
import { ClientNotSignedInGuard, SignUpConfirmForm } from '@fe/iam';
import { UserId } from '@lib/shared';

export default function SignUpConfirmPage() {
  const { getQueryParam } = useRouting();

  const userIdQueryParam = getQueryParam<UserId>('userId');
  const emailQueryParam = getQueryParam('email');

  return (
    <ClientNotSignedInGuard>
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
    </ClientNotSignedInGuard>
  );
}
