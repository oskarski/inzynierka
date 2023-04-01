import { assertIsDefined, env } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { IIamApi, ISignedInUserDto, useSignedInUser, useSignOut } from './api';
import { Amplify } from 'aws-amplify';
import { ErrorText, Loader } from '@fe/components';

interface IIamContext {
  readonly iamApi: IIamApi;
  readonly signOut: () => void;
  readonly signedInUser: ISignedInUserDto | null;
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
  if (error) return <ErrorText error={error} />;

  const ctx: IIamContext = {
    iamApi: props.iamApi,
    signOut,
    signedInUser,
  };

  return (
    <IamContext.Provider value={ctx}>
      <form ref={signOutFormRef} action="/api/sign-out" method="post" />

      {children}
    </IamContext.Provider>
  );
};

export const useIam = (): IIamContext => {
  const { iamApi, signOut, signedInUser } = useContext(IamContext);

  assertIsDefined(iamApi, 'IIamContext.iamApi must be defined!');
  assertIsDefined(signOut, 'IIamContext.signOut must be defined!');
  assertIsDefined(signedInUser, 'IIamContext.signedInUser must be defined!');

  return { iamApi, signOut, signedInUser };
};
