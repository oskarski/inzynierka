import Head from 'next/head';
import { headTitle } from '@fe/utils';
import React from 'react';
import { ErrorBlock } from 'antd-mobile';
import { PublicPage } from '../server/server-public-page';
import { GetStaticProps } from 'next/types';

export const getStaticProps: GetStaticProps = PublicPage();

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>{headTitle('404 - Nie znaleziono')}</title>
      </Head>

      <main>
        <ErrorBlock
          status="empty"
          fullPage={true}
          title="Nie udało się nam znaleźć tego, czego szukasz"
          description=""
        />
      </main>
    </>
  );
}
