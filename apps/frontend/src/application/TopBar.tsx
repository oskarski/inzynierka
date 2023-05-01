import { Avatar, List, NavBar } from 'antd-mobile';
import {
  LogoutOutlined,
  ReadOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';
import { routes, useRouting } from '@fe/utils';
import React, { useCallback } from 'react';
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

const ProfileAvatar = AppPopup.withAppPopup(() => {
  const { redirectTo } = useRouting();
  const [signedInUser] = useSignedInUser();
  const signOut = useSignOut();
  const closePopup = AppPopup.useClosePopup();

  const onClickPopupListItem = useCallback(
    (onClick: () => void) => () => {
      closePopup();
      onClick();
    },
    [closePopup]
  );

  if (!signedInUser) return null;

  return (
    <>
      <AppPopup.TriggerButton className="inline-block">
        {/*TODO Replace with current user avatar*/}
        <Avatar
          src=""
          className="ml-auto"
          style={{ '--size': '48px', '--border-radius': '100%' }}
        />
      </AppPopup.TriggerButton>

      <AppPopup.Content>
        <AppPopup.Title>Menu</AppPopup.Title>

        <List style={{ '--border-bottom': '0' }}>
          <List.Item
            prefix={<ReadOutlined />}
            onClick={onClickPopupListItem(() =>
              redirectTo(routes.yourRecipes())
            )}
            arrow={false}
          >
            Twoje przepisy
          </List.Item>

          <List.Item
            prefix={<PlusCircleOutlined />}
            onClick={onClickPopupListItem(() =>
              redirectTo(routes.createRecipe())
            )}
            arrow={false}
          >
            Dodaj przepis
          </List.Item>

          <List.Item
            prefix={<LogoutOutlined />}
            onClick={onClickPopupListItem(signOut)}
            arrow={false}
          >
            Wyloguj
          </List.Item>
        </List>
      </AppPopup.Content>
    </>
  );
});
