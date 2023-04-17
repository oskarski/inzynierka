import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { ForgotPasswordForm } from '../iam/view/ForgotPasswordForm';
import { ForgotPasswordSubmitForm } from '../iam/view/ForgotPasswordSubmitForm';
import { useState } from 'react';
import { ClientNotSignedInGuard } from '@fe/iam';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | undefined>(undefined);

  return (
    <ClientNotSignedInGuard>
      <Head>
        <title>{headTitle('Przypomnij hasło')}</title>
      </Head>

      <main>
        {!email && (
          <ForgotPasswordForm onSuccess={(email) => setEmail(email)} />
        )}

        {email && <ForgotPasswordSubmitForm email={email} />}
      </main>
    </ClientNotSignedInGuard>
  );
}
