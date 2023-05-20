import Head from 'next/head';
import { headTitle, useRouting } from '@fe/utils';
import { ClientNotSignedInGuard, SignUpConfirmForm } from '@fe/iam';
import { UserId } from '@lib/shared';
import { PublicPage } from '../../../server/server-public-page';
import { SectionTitle } from '@fe/components';

// This needs to be `getServerSideProps` since it has dynamic url -> perhaps we should pass userId in query ...
export const getServerSideProps = PublicPage();

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
        {/* TODO Move this check to server side and if not correct go to /404 */}
        {userIdQueryParam && emailQueryParam && (
          <div className="mx-auto sm:mt-10 sm:max-w-md">
            <SectionTitle className="mb-6">Potwierdź rejestracje</SectionTitle>

            <SignUpConfirmForm
              userId={userIdQueryParam}
              email={atob(emailQueryParam)}
            />
          </div>
        )}
      </main>
    </ClientNotSignedInGuard>
  );
}
