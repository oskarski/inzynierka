import { TabBar } from 'antd-mobile';
import {
  HomeOutlined,
  ReadOutlined,
  SearchOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { routes, useRouting } from '@fe/utils';
import { useIam } from '@fe/iam';
import { AppPopup } from '@fe/components';
import { SearchRecipesByIngredientsPopupContent } from '@fe/recipes';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar = AppPopup.withAppPopup(
  ({ className }: NavigationBarProps) => {
    const { currentRoute, redirectTo } = useRouting();
    const { signedInUser } = useIam();

    const openSearchPopup = AppPopup.useOpenPopup();

    if (!signedInUser) return null;

    const searchKey = 'search';

    return (
      <>
        <TabBar
          activeKey={currentRoute}
          className={classNames('border-t sm:hidden py-2', className)}
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

        <SearchRecipesByIngredientsPopupContent />
      </>
    );
  }
);

export default NavigationBar;
