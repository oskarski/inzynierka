import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import React from 'react';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function EditYourRecipePage() {
  return (
    <>
      <Head>
        <title>{headTitle('Edytuj przepis')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Edytuj przepis</SectionTitle>
        Edit form will be here ...
      </main>
    </>
  );
}
