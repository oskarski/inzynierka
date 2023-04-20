import React, { PropsWithChildren, useEffect } from 'react';
import { useSignedInUser } from '@fe/iam/api';
import { ApiErrorMessage } from '@fe/errors';
import { routes, useRouting } from '@fe/utils';

export const ClientNotSignedInGuard = ({ children }: PropsWithChildren<{}>) => {
  const { redirectTo } = useRouting();

  const [signedInUser, , error] = useSignedInUser();

  useEffect(() => {
    // Redirecting in useEffect for SSG reasons
    if (signedInUser) redirectTo(routes.home());
  }, []);

  if (error) return <ApiErrorMessage size="base" error={error} />;

  return <>{children}</>;
};
