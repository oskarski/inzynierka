import { assertIsDefined, env } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {IForgotPasswordDto, IIamApi, ISignedInUserDto, useSignedInUser, useSignOut} from './api';
import { Amplify } from 'aws-amplify';
import { Loader } from '@fe/components';
import { ApiErrorMessage } from '@fe/errors';

interface IIamContext {
  readonly iamApi: IIamApi;
  readonly signOut: () => void;
  readonly signedInUser: ISignedInUserDto | null;
  readonly forgotPassword: IForgotPasswordDto | null;
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

  const signOut = useSignOut(signOutFormRef);
  const [signedInUser, loading, error] = useSignedInUser(props.iamApi);

  if (loading) return <Loader className="my-3" />;
  if (error) return <ApiErrorMessage size="base" error={error} />;

  const ctx: IIamContext = {
    iamApi: props.iamApi,
    signOut,
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
  const { iamApi, signOut, signedInUser, forgotPassword } = useContext(IamContext);

  assertIsDefined(iamApi, 'IIamContext.iamApi must be defined!');
  assertIsDefined(signOut, 'IIamContext.signOut must be defined!');
  assertIsDefined(signedInUser, 'IIamContext.signedInUser must be defined!');
  assertIsDefined(forgotPassword, 'IIamContext.forgotPassword must be defined!');

  return { iamApi, signOut, signedInUser, forgotPassword };
};
