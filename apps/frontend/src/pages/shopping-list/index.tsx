import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../../server/server-guards';
import { HydrateReactQueryState } from '../../server/server-react-query';
import { Empty, Loader, SectionTitle } from '@fe/components';
import { ApiErrorMessage } from '@fe/errors';
import React from 'react';
import { Button, Checkbox, List } from 'antd-mobile';
import { FrownOutlined } from '@ant-design/icons';
import { useGetShoppingList } from '@fe/shopping-list';
import { IShoppingListItemDto } from '@lib/shared';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function ShoppingListPage() {
  const [shoppingList, loading, error] = useGetShoppingList();

  return (
    <>
      <Head>
        <title>{headTitle('Lista zakupów')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Lista zakupów</SectionTitle>

        {loading && <Loader />}
        {error && <ApiErrorMessage size="base" error={error} />}

        {shoppingList && !shoppingList.length && (
          <Empty
            icon={<FrownOutlined />}
            className="mt-10"
            title="Hmm ..."
            description={
              <>
                Twoja lista zakupów świeci pustkami.
                <br />
                <br />
                Już teraz dodaj produkty do listy!
              </>
            }
            cta={
              //  TODO trigger popup
              <Button color="primary" fill="outline">
                Dodaj do zakupów
              </Button>
            }
          />
        )}

        {shoppingList && shoppingList.length > 0 && (
          <List style={{ '--padding-left': '0' }}>
            {shoppingList.map((item) => (
              <ShoppingListItem key={item.id} item={item} />
            ))}
          </List>
        )}
      </main>
    </>
  );
}

function ShoppingListItem({ item }: { item: IShoppingListItemDto }) {
  return (
    <List.Item
      prefix={
        <Checkbox
          checked={item.completed}
          id={`checkbox-${item.id}`}
          value={item.id}
          onChange={() => {
            console.log('TOGGLE');
          }}
        />
      }
    >
      <label htmlFor={`checkbox-${item.id}`}>
        {item.name} - {item.quantity} {item.unit}
      </label>
    </List.Item>
  );
}
