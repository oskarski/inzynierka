import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../server/server-guards';
import { HydrateReactQueryState } from '../server/server-react-query';
import React from 'react';
import { ErrorBlock } from 'antd-mobile';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{headTitle('Offline')}</title>
      </Head>

      <main>
        <ErrorBlock
          status="disconnected"
          fullPage={true}
          title="Wygląda na to, że jesteś offline"
          description=""
        />
      </main>
    </>
  );
}
