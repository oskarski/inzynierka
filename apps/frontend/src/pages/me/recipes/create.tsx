import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function CreateYourRecipePage() {
  return (
    <>
      <Head>
        <title>{headTitle('Dodaj przepis')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Dodaj przepis</SectionTitle>
        {/* TODO Create recipe page */}
        Create recipe page will be here ...
      </main>
    </>
  );
}
