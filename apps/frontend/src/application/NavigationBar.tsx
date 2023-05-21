import { SafeArea, SideBar, TabBar } from 'antd-mobile';
import {
  HomeOutlined,
  ReadOutlined,
  SearchOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { routes, useRouting } from '@fe/utils';
import { useSignedInUser } from '@fe/iam';
import { AppPopup } from '@fe/components';
import {
  SearchRecipesByIngredientsPopupContent,
  useRecipesFilters,
} from '@fe/recipes';
import Link from 'next/link';
import React from 'react';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar = AppPopup.withAppPopup(
  ({ className }: NavigationBarProps) => {
    const { currentRoute, redirectTo } = useRouting();
    const [signedInUser] = useSignedInUser();
    const { selectedIngredients } = useRecipesFilters();

    const openSearchPopup = AppPopup.useOpenPopup();

    if (!signedInUser) return null;

    const searchKey = 'search';

    return (
      <>
        <div className="hidden md:block fixed left-0 top-0 bottom-0 w-44 bg-neutral-100">
          <Link href={routes.home()} className="hidden md:block pt-6 pb-5 px-3">
            Cook Mate
          </Link>

          <SideBar
            activeKey={currentRoute}
            onChange={(key) => {
              if (key === searchKey) return openSearchPopup();

              redirectTo(key);
            }}
            style={{ '--width': '100%' }}
          >
            <SideBar.Item key={routes.home()} title="Start" />

            <SideBar.Item key={routes.recipes()} title="Przepisy" />

            <SideBar.Item
              key={searchKey}
              title="Szukaj"
              badge={
                selectedIngredients.length === 0
                  ? null
                  : selectedIngredients.length
              }
            />

            <SideBar.Item key={routes.shoppingList()} title="Zakupy" />

            <SideBar.Item key={routes.favourite()} title="Ulubione" />
          </SideBar>
        </div>

        <div className={className}>
          <TabBar
            activeKey={currentRoute}
            className="border-t md:hidden py-2"
            onChange={(key) => {
              if (key === searchKey) return openSearchPopup();

              redirectTo(key);
            }}
          >
            <TabBar.Item
              key={routes.home()}
              title="Start"
              icon={<HomeOutlined />}
            />

            <TabBar.Item
              key={routes.recipes()}
              title="Przepisy"
              icon={<ReadOutlined />}
            />

            <TabBar.Item
              key={searchKey}
              title="Szukaj"
              icon={<SearchOutlined />}
              badge={
                selectedIngredients.length === 0
                  ? null
                  : selectedIngredients.length
              }
            />

            <TabBar.Item
              key={routes.shoppingList()}
              title="Zakupy"
              icon={<ShoppingOutlined />}
            />

            <TabBar.Item
              key={routes.favourite()}
              title="Ulubione"
              icon={<HeartOutlined />}
            />
          </TabBar>

          <SafeArea position="bottom" />
        </div>

        <SearchRecipesByIngredientsPopupContent />
      </>
    );
  }
);

export default NavigationBar;
