import Head from 'next/head';
import { headTitle } from '@fe/utils';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{headTitle()}</title>
      </Head>

      <main>HOME PAGE WILL BE HERE</main>
    </>
  );
}
