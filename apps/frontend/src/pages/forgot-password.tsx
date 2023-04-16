import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { NotSignedInGuard } from '@fe/server/server-guards';
import { ForgotPasswordForm } from '../iam/view/ForgotPasswordForm';
import { ForgotPasswordSubmitForm } from '../iam/view/ForgotPasswordSubmitForm';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = NotSignedInGuard();

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <>
      <Head>
        <title>{headTitle('Przypomnij hasło')}</title>
      </Head>

      <main>
        {!email && (
          <ForgotPasswordForm onSuccess={(email) => setEmail(email)} />
        )}

        {email && ( // Corrected the curly braces
          <ForgotPasswordSubmitForm email={email} />
        )}
      </main>
    </>
  );
}
