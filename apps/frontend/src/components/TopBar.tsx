import { Avatar, NavBar } from 'antd-mobile';
import classNames from 'classnames';
import Link from 'next/link';
import { routes } from '@fe/utils';

interface TopBarProps {
  className?: string;
}

export const TopBar = ({ className }: TopBarProps) => {
  return (
    <div className={classNames('py-2', className)}>
      <NavBar
        backArrow={false}
        back={null}
        left={<Link href={routes.home()}>AppName</Link>}
        right={
          // TODO Replace with current user avatar
          <Avatar
            src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            className="ml-auto"
            style={{ '--size': '48px', '--border-radius': '100%' }}
          />
        }
      />
    </div>
  );
};
