import React, { PropsWithChildren, useMemo } from 'react';
import { env, HttpClient } from '@fe/utils';

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  const httpClient = useMemo(() => new HttpClient(env().apiUrl), []);

  const api = useMemo(() => ({}), [httpClient]);

  return <>{children}</>;
};
