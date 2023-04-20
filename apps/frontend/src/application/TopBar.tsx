import { Avatar, List, NavBar } from 'antd-mobile';
import { LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';
import { routes } from '@fe/utils';
import React from 'react';
import { useSignedInUser, useSignOut } from '@fe/iam';
import { AppPopup } from '@fe/components';

interface TopBarProps {
  className?: string;
}

const TopBar = ({ className }: TopBarProps) => {
  return (
    <div className={classNames('py-2', className)}>
      <NavBar
        backArrow={false}
        back={null}
        left={<Link href={routes.home()}>AppName</Link>}
        right={<ProfileAvatar />}
      />
    </div>
  );
};

export default TopBar;

function ProfileAvatar() {
  const [signedInUser] = useSignedInUser();
  const signOut = useSignOut();

  if (!signedInUser) return null;

  return (
    <AppPopup>
      <AppPopup.TriggerButton className="inline-block">
        {/*TODO Replace with current user avatar*/}
        <Avatar
          src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          className="ml-auto"
          style={{ '--size': '48px', '--border-radius': '100%' }}
        />
      </AppPopup.TriggerButton>

      <AppPopup.Content>
        <AppPopup.Title>Menu</AppPopup.Title>

        <List style={{ '--border-bottom': '0' }}>
          <List.Item
            prefix={<LogoutOutlined />}
            onClick={signOut}
            arrow={false}
          >
            Wyloguj
          </List.Item>
        </List>
      </AppPopup.Content>
    </AppPopup>
  );
}
