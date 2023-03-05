import { TabBar } from 'antd-mobile';
import {
  HomeOutlined,
  ReadOutlined,
  SearchOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';

interface NavigationBarProps {
  className?: string;
}

export const NavigationBar = ({ className }: NavigationBarProps) => {
  return (
    // TODO set active based on current route
    <TabBar className={classNames('border-t sm:hidden py-2', className)}>
      <TabBar.Item key="start" title="Start" icon={<HomeOutlined />} />

      <TabBar.Item key="recipes" title="Przepisy" icon={<ReadOutlined />} />

      <TabBar.Item key="search" title="Szukaj" icon={<SearchOutlined />} />

      <TabBar.Item
        key="shopping-list"
        title="Zakupy"
        icon={<ShoppingOutlined />}
      />

      <TabBar.Item key="favourite" title="Ulubione" icon={<HeartOutlined />} />
    </TabBar>
  );
};
