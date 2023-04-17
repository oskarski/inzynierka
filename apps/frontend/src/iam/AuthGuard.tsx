import React, { PropsWithChildren } from 'react';
import { useSignedInUser } from '@fe/iam/api';
import { Loader } from '@fe/components';
import { ApiErrorMessage } from '@fe/errors';
import { routes, useRouting } from '@fe/utils';

export const ClientSignedInGuard = ({ children }: PropsWithChildren<{}>) => {
  const { redirectTo } = useRouting();

  const [signedInUser, loading, error] = useSignedInUser();

  if (loading) return <Loader className="my-3" />;
  if (error) return <ApiErrorMessage size="base" error={error} />;
  if (!signedInUser) {
    redirectTo(routes.signIn());

    return null;
  }

  return <>{children}</>;
};

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
