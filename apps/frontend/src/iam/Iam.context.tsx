import { assertIsDefined, env } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { IIamApi } from './api';
import { Amplify } from 'aws-amplify';

interface IIamContext {
  readonly iamApi: IIamApi;
  readonly signOut: () => void;
}

const IamContext = createContext<Partial<IIamContext>>({});

interface IamProps {
  readonly iamApi: IIamApi;
}

export const IamProvider = ({
  children,
  ...props
}: PropsWithChildren<IamProps>) => {
  const signOutFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    Amplify.configure({
      Auth: env().cognito,
      ssr: true,
    });
  }, []);

  const signOut = useCallback(() => {
    if (!signOutFormRef.current) return;

    signOutFormRef.current.submit();
  }, []);

  const ctx: IIamContext = {
    iamApi: props.iamApi,
    signOut,
  };

  return (
    <IamContext.Provider value={ctx}>
      <form ref={signOutFormRef} action="/api/sign-out" method="post" />

      {children}
    </IamContext.Provider>
  );
};

export const useIam = (): IIamContext => {
  const { iamApi, signOut } = useContext(IamContext);

  assertIsDefined(iamApi, 'IIamContext.iamApi must be defined!');
  assertIsDefined(signOut, 'IIamContext.signOut must be defined!');

  return { iamApi, signOut };
};
