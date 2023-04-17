import { assertIsDefined } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import {
  IForgotPasswordDto,
  IIamApi,
  ISignedInUserDto,
  useRefreshSession,
  useSignedInUser,
  useSignOut,
} from './api';
import { Loader } from '@fe/components';
import { ApiErrorMessage } from '@fe/errors';

interface IIamContext {
  readonly iamApi: IIamApi;
  readonly signOut: () => void;
  readonly refreshSession: () => void;
  readonly signedInUser: ISignedInUserDto | null;
  readonly forgotPassword: IForgotPasswordDto | null;
}

const IamContext = createContext<Partial<IIamContext>>({});

interface IamProps {
  iamApi: IIamApi;
}

export const IamProvider = ({
  children,
  ...props
}: PropsWithChildren<IamProps>) => {
  const signOutFormRef = useRef<HTMLFormElement>(null);

  const signOut = useSignOut(props.iamApi, signOutFormRef);
  const refreshSession = useRefreshSession(props.iamApi, signOut);

  const [signedInUser, loading, error] = useSignedInUser(props.iamApi);

  if (loading) return <Loader className="my-3" />;
  if (error) return <ApiErrorMessage size="base" error={error} />;

  const ctx: IIamContext = {
    iamApi: props.iamApi,
    signOut,
    refreshSession,
    signedInUser,
    forgotPassword: null,
  };

  return (
    <IamContext.Provider value={ctx}>
      <form ref={signOutFormRef} action="/api/sign-out" method="post" />

      {children}
    </IamContext.Provider>
  );
};

export const useIam = (): IIamContext => {
  const { iamApi, signOut, refreshSession, signedInUser, forgotPassword } =
    useContext(IamContext);

  assertIsDefined(iamApi, 'IIamContext.iamApi must be defined!');
  assertIsDefined(signOut, 'IIamContext.signOut must be defined!');
  assertIsDefined(
    refreshSession,
    'IIamContext.refreshSession must be defined!'
  );
  assertIsDefined(signedInUser, 'IIamContext.signedInUser must be defined!');
  assertIsDefined(
    forgotPassword,
    'IIamContext.forgotPassword must be defined!'
  );

  return { iamApi, signOut, refreshSession, signedInUser, forgotPassword };
};
