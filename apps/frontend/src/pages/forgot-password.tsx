import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ForgotPasswordForm } from '../iam/view/ForgotPasswordForm';
import { ForgotPasswordSubmitForm } from '../iam/view/ForgotPasswordSubmitForm';
import { useState } from 'react';
import { ClientNotSignedInGuard } from '@fe/iam';
import { GetStaticProps } from 'next/types';
import { PublicPage } from '../server/server-public-page';
import { SectionTitle } from '@fe/components';

export const getStaticProps: GetStaticProps = PublicPage();

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <ClientNotSignedInGuard>
      <Head>
        <title>{headTitle('Przypomnij hasło')}</title>
      </Head>

      <main>
        <div className="mx-auto sm:mt-10 sm:max-w-md">
          {!email && (
            <>
              <SectionTitle className="mb-6">Przypomnij hasło</SectionTitle>

              <ForgotPasswordForm onSuccess={(email) => setEmail(email)} />
            </>
          )}

          {email && (
            <>
              <SectionTitle className="mb-6">
                Potwierdź zmianę hasła
              </SectionTitle>

              <ForgotPasswordSubmitForm email={email} />
            </>
          )}
        </div>
      </main>
    </ClientNotSignedInGuard>
  );
}
