import { assertIsDefined, env } from '@fe/utils';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { IIamApi } from './api';
import { Amplify } from 'aws-amplify';

interface IIamContext {
  readonly iamApi: IIamApi;
}

const IamContext = createContext<Partial<IIamContext>>({});

export const IamProvider = ({
  children,
  ...props
}: PropsWithChildren<IIamContext>) => {
  useEffect(() => {
    Amplify.configure({
      Auth: env().cognito,
      ssr: true,
    });
  }, []);

  return <IamContext.Provider value={props}>{children}</IamContext.Provider>;
};

export const useIam = (): IIamContext => {
  const { iamApi } = useContext(IamContext);

  assertIsDefined(iamApi, 'IIamContext.iamApi must be defined!');

  return { iamApi };
};
