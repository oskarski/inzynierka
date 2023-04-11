import { Popup } from 'antd-mobile';
import React, {
  createContext,
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { assertIsDefined } from '@fe/utils';

interface IAppPopupContext {
  opened: boolean;
  open: () => void;
  close: () => void;
}

const AppPopupContext = createContext<Partial<IAppPopupContext>>({});

const useAppPopupContext = (): IAppPopupContext => {
  const { opened, open, close } = useContext(AppPopupContext);

  assertIsDefined(opened, 'IAppPopupContext.opened must be defined!');
  assertIsDefined(open, 'IAppPopupContext.open must be defined!');
  assertIsDefined(close, 'IAppPopupContext.close must be defined!');

  return { opened, open, close };
};

interface AppPopupProps {
  defaultOpened?: boolean;
}

export const AppPopup = ({
  defaultOpened = false,
  children,
}: PropsWithChildren<AppPopupProps>) => {
  const [opened, toggleMenuOpened] = useState(defaultOpened);

  const open = useCallback(() => toggleMenuOpened(true), []);

  const close = useCallback(() => toggleMenuOpened(false), []);

  const ctxValue: IAppPopupContext = {
    opened,
    open,
    close,
  };

  return (
    <AppPopupContext.Provider value={ctxValue}>
      {children}
    </AppPopupContext.Provider>
  );
};

AppPopup.withAppPopup = function withAppPopup<PropsType>(
  Component: FunctionComponent<PropsType>
) {
  return (props: PropsType) => (
    <AppPopup>
      {/* @ts-ignore*/}
      <Component {...props} />
    </AppPopup>
  );
};

AppPopup.Title = function Title({ children }: PropsWithChildren<{}>) {
  return (
    <h5 className="text-2xl text-default font-medium text-center mb-4">
      {children}
    </h5>
  );
};

AppPopup.Content = function Content({ children }: PropsWithChildren<{}>) {
  const { opened, close } = useAppPopupContext();

  return (
    <Popup
      visible={opened}
      onMaskClick={close}
      bodyClassName="rounded-t-2xl overflow-y-auto"
    >
      <div className="p-4 flex flex-col max-h-90-screen">{children}</div>
    </Popup>
  );
};

AppPopup.withAppPopupContent = function withAppPopupContent<PropsType>(
  Component: FunctionComponent<PropsType>
) {
  return (props: PropsType) => (
    <AppPopup.Content>
      {/* @ts-ignore*/}
      <Component {...props} />
    </AppPopup.Content>
  );
};

AppPopup.TriggerButton = function TriggerButton(
  props: HTMLAttributes<HTMLButtonElement>
) {
  const { open } = useAppPopupContext();

  return <button type="button" {...props} onClick={open} />;
};

AppPopup.useOpenPopup = function useOpenPopup() {
  const { open } = useAppPopupContext();

  return open;
};

AppPopup.useClosePopup = function useClosePopup() {
  const { close } = useAppPopupContext();

  return close;
};
