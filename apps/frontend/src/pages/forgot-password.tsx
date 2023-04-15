import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { NotSignedInGuard } from '@fe/iam';
import { ForgotPasswordForm } from '../iam/view/ForgotPasswordForm';
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

        {/*{email && <ForgotPasswordSubmitForm email={email} />}*/}
      </main>
    </>
  );
}
