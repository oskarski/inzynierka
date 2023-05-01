import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function YourRecipesPage() {
  return (
    <>
      <Head>
        <title>{headTitle('Twoje przepisy')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Twoje przepisy</SectionTitle>
        {/* TODO List user recipes here */}
        Your recipes will be here ...
      </main>
    </>
  );
}
