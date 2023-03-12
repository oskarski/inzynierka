import Head from 'next/head';
import { headTitle, routes } from '@fe/utils';
import { SectionTitle } from '@fe/components';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{headTitle()}</title>
      </Head>

      <main>
        <SectionTitle href={routes.categories()}>
          Popularne kategorie
        </SectionTitle>
      </main>
    </>
  );
}
