import Head from 'next/head';
import { env, headTitle, HttpClient } from '@fe/utils';
import { GetServerSideProps } from 'next';
import { SignedInGuard } from '../../server/server-guards';
import { HydrateReactQueryState } from '../../server/server-react-query';
import {
  Empty,
  LinkButton,
  Loader,
  PickerBasedSelect,
  SectionTitle,
} from '@fe/components';
import { ApiErrorMessage } from '@fe/errors';
import React, { useState } from 'react';
import { Button, Checkbox, List, SafeArea, Stepper } from 'antd-mobile';
import { FrownOutlined } from '@ant-design/icons';
import {
  GetShoppingListQueryKey,
  ShoppingListApi,
  useBulkDeleteShoppingListItems,
  useGetShoppingList,
  useUpdateShoppingListItem,
} from '@fe/shopping-list';
import { IShoppingListItemDto } from '@lib/shared';
import { useUnitOptions } from '@fe/ingredients';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async ({}, queryClient, user) => {
    const httpClient = HttpClient.privateHttpClient(env().apiUrl, {
      accessToken: user.accessToken,
    });

    const shoppingListApi = new ShoppingListApi(httpClient);

    await queryClient.prefetchQuery(GetShoppingListQueryKey, () =>
      shoppingListApi.listShoppingListItems()
    );

    return {
      props: {},
    };
  })
);

export default function ShoppingListPage() {
  const [shoppingList, loading, listingError] = useGetShoppingList();

  const [deleteShoppingListItems, deleteLoading, deleteError] =
    useBulkDeleteShoppingListItems();

  const error = listingError || deleteError;

  return (
    <>
      <Head>
        <title>{headTitle('Lista zakupów')}</title>
      </Head>

      <main>
        <div className="flex justify-between items-center mb-6">
          <SectionTitle>Lista zakupów</SectionTitle>

          {shoppingList && shoppingList.length > 0 && (
            <LinkButton
              loading={deleteLoading}
              onClick={() =>
                deleteShoppingListItems({
                  itemIds: shoppingList.map((item) => item.id),
                })
              }
            >
              Wyczyść listę
            </LinkButton>
          )}
        </div>

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

        <div className="fixed z-10 bottom-20 left-4 right-4 sm:bottom-6">
          <Button
            block={true}
            color="primary"
            onClick={() => {
              // TODO Add
              console.log('ADD');
            }}
          >
            Dodaj
          </Button>

          <SafeArea position="bottom" />
        </div>
      </main>
    </>
  );
}

interface ShoppingListItemProps {
  item: IShoppingListItemDto;
}

function ShoppingListItem({ item }: ShoppingListItemProps) {
  const unitOptions = useUnitOptions();

  const [deleteShoppingListItems, deleteLoading, deleteError] =
    useBulkDeleteShoppingListItems();

  const [updateShoppingListItem, updateLoading, updateError] =
    useUpdateShoppingListItem(item.id, { onSuccess: () => {} });

  const [editMode, toggleEditMode] = useState(false);

  const error = deleteError || updateError;

  return (
    <List.Item
      prefix={
        !editMode && (
          <Checkbox
            checked={item.completed}
            id={`checkbox-${item.id}`}
            value={item.id}
            disabled={updateLoading}
            onChange={(value) =>
              updateShoppingListItem({ ...item, completed: value })
            }
          />
        )
      }
      arrow={
        editMode ? (
          <>
            <LinkButton
              variant="primary"
              className="mr-2"
              onClick={() => {
                // TODO Edit
                console.log('Edit');
              }}
            >
              Zapisz
            </LinkButton>

            <LinkButton onClick={() => toggleEditMode(false)}>
              Anuluj
            </LinkButton>
          </>
        ) : (
          <>
            <LinkButton onClick={() => toggleEditMode(true)}>Edytuj</LinkButton>

            <LinkButton
              loading={deleteLoading}
              variant="primary"
              className="ml-2"
              onClick={() => deleteShoppingListItems({ itemIds: [item.id] })}
            >
              Usuń
            </LinkButton>
          </>
        )
      }
    >
      {!editMode && (
        <label htmlFor={`checkbox-${item.id}`}>
          {item.name} - {item.quantity} {item.unit}
        </label>
      )}

      {editMode && (
        <>
          {item.name}
          <div className="flex items-center text-sm mt-2 mr-3">
            <Stepper
              min={1}
              value={item.quantity}
              className="mr-2"
              onChange={(value) => {
                // TODO change quantity
                console.log(value);
              }}
            />

            <PickerBasedSelect
              value={item.unit}
              options={unitOptions}
              onChange={(value) => {
                // TODO change unit
                console.log(value);
              }}
            />
          </div>
        </>
      )}

      {error && <ApiErrorMessage error={error} />}
    </List.Item>
  );
}
