import React, { PropsWithChildren } from 'react';
import { useSignedInUser } from '@fe/iam/api';
import { ApiErrorMessage } from '@fe/errors';
import { routes, useRouting } from '@fe/utils';

export const ClientNotSignedInGuard = ({ children }: PropsWithChildren<{}>) => {
  const { redirectTo } = useRouting();

  const [signedInUser, , error] = useSignedInUser();

  if (error) return <ApiErrorMessage size="base" error={error} />;
  if (signedInUser) {
    redirectTo(routes.home());

    return null;
  }

  return <>{children}</>;
};
