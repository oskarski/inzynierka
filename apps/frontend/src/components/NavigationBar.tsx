import { TabBar } from 'antd-mobile';
import {
  HomeOutlined,
  ReadOutlined,
  SearchOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface NavigationBarProps {
  className?: string;
}

export const NavigationBar = ({ className }: NavigationBarProps) => {
  const router = useRouter();

  return (
    <TabBar
      activeKey={router.route}
      className={classNames('border-t sm:hidden py-2', className)}
      onChange={(key) => {
        if (key === 'search') {
          // TODO Open search modal
          return;
        }

        router.push(key);
      }}
    >
      <TabBar.Item key="/" title="Start" icon={<HomeOutlined />} />

      <TabBar.Item key="/recipes" title="Przepisy" icon={<ReadOutlined />} />

      <TabBar.Item key="search" title="Szukaj" icon={<SearchOutlined />} />

      <TabBar.Item
        key="/shopping-list"
        title="Zakupy"
        icon={<ShoppingOutlined />}
      />

      <TabBar.Item key="/favourite" title="Ulubione" icon={<HeartOutlined />} />
    </TabBar>
  );
};
