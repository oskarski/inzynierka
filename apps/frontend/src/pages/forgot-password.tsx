import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { NotSignedInGuard } from '@fe/iam';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = NotSignedInGuard();

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Przypomnij hasło')}</title>
      </Head>

      <main>{/* TODO Implement */}</main>
    </>
  );
}
