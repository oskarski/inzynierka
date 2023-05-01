import Head from 'next/head';
import { headTitle, routes } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import { PlusSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';

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
        <div className="flex items-center justify-between mb-6">
          <SectionTitle>Twoje przepisy</SectionTitle>

          <Link href={routes.createRecipe()}>
            <PlusSquareOutlined className="text-2xl" />
          </Link>
        </div>
        {/* TODO List user recipes here */}
        Your recipes will be here ...
      </main>
    </>
  );
}
