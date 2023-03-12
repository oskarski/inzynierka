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
        <SectionTitle href={routes.recipes()}>Popularne przepisy</SectionTitle>
        <div>POPULAR RECIPES WILL BE HERE</div>

        <SectionTitle href={routes.categories()}>
          Popularne kategorie
        </SectionTitle>
        <div>POPULAR CATEGORIES WILL BE HERE</div>
      </main>
    </>
  );
}
