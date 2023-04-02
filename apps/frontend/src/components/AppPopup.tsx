import { Popup } from 'antd-mobile';
import React, {
  createContext,
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

export const AppPopup = ({ children }: PropsWithChildren<{}>) => {
  const [opened, toggleMenuOpened] = useState(false);

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

AppPopup.Content = function Content({ children }: PropsWithChildren<{}>) {
  const { opened, close } = useAppPopupContext();

  return (
    <Popup
      visible={opened}
      onMaskClick={close}
      bodyClassName="rounded-t-2xl overflow-y-auto"
    >
      {children}
    </Popup>
  );
};

AppPopup.TriggerButton = function TriggerButton(
  props: HTMLAttributes<HTMLButtonElement>
) {
  const { open } = useAppPopupContext();

  return <button type="button" {...props} onClick={open} />;
};
