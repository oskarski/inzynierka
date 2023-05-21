import Head from 'next/head';
import { headTitle } from '@fe/utils';
import React from 'react';
import { ErrorBlock } from 'antd-mobile';
import { PublicPage } from '../server/server-public-page';
import { GetStaticProps } from 'next/types';

export const getStaticProps: GetStaticProps = PublicPage();

export default function OfflinePage() {
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
