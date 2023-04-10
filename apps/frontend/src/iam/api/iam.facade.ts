import { useIam } from '../Iam.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import {
  IConfirmSignUpDto,
  IIamApi,
  ISignedInUserDto,
  ISignInDto,
  ISignUpDto,
  IForgotPasswordDto,
} from './IamApi';
import {
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { SignUpFormSchema } from './schema/sign-up.schema';
import { ConfirmSignUpFormSchema } from './schema/confirm-sign-up.schema';
import { SignInFormSchema } from './schema/sign-in.schema';
import { ForgotPasswordSchema } from './schema/forgot-password.schema';
import { RefObject, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const SignedInUserQueryKey = ['iamApi', 'signedInUser'];
const ForgotPasswordQueryKey = ['iamApi', 'forgotPassword'];

export const useSignUp = ({
  onSuccess,
}: { onSuccess?: (email: string) => void } = {}) => {
  const { iamApi } = useIam();

  return useAdaptedMutation<void, ISignUpDto, FormValidationOrApiError>(
    (formValues) =>
      SignUpFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.signUp(dto))
        .catch(catchFormValidationOrApiError),
    { onSuccess: (_, formValues) => onSuccess && onSuccess(formValues.email) }
  );
};

export const useConfirmSignUp = (
  email: string,
  { onSuccess }: { onSuccess?: () => void } = {}
) => {
  const { iamApi } = useIam();

  return useAdaptedMutation<void, IConfirmSignUpDto, FormValidationOrApiError>(
    (formValues) =>
      ConfirmSignUpFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.confirmSignUp({ email, ...dto }))
        .catch(catchFormValidationOrApiError),
    { onSuccess }
  );
};

export const useSignIn = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const { iamApi } = useIam();

  return useAdaptedMutation<
    ISignedInUserDto,
    ISignInDto,
    FormValidationOrApiError
  >(
    (formValues) =>
      SignInFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.signIn(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (signedInUser) => {
        queryClient.setQueryData(SignedInUserQueryKey, signedInUser);

        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useSignOut = (signOutFormRef: RefObject<HTMLFormElement>) => {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    if (!signOutFormRef.current) return;

    queryClient.clear();
    queryClient.setQueryData(SignedInUserQueryKey, null);
    await Auth.signOut();
    signOutFormRef.current.submit();
  }, []);
};

export const useSignedInUser = (iamApi: IIamApi) => {
  return useAdaptedQuery<ISignedInUserDto | null>(SignedInUserQueryKey, () =>
    iamApi.signedInUser()
  );
};

export const useForgotPassword = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const { iamApi } = useIam();

  return useAdaptedMutation<void, FormValidationOrApiError>(
    (formValues) =>
      ForgotPasswordSchema.parseAsync(formValues)
        .then((dto) => iamApi.forgotPassword(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (response) => {
        queryClient.setQueryData<ISignedInUserDto | null>(
          SignedInUserQueryKey,
          null
        );

        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useRefreshSession = (signOut: () => void) => {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = cognitoUser.signInUserSession;

    cognitoUser.refreshSession(
      currentSession.refreshToken,
      (error: Error, session: CognitoUserSession) => {
        // could not refresh session
        if (error) return signOut();

        const signedInUser =
          queryClient.getQueryData<ISignedInUserDto>(SignedInUserQueryKey);

        queryClient.setQueryData(SignedInUserQueryKey, {
          ...signedInUser,
          accessToken: session.getAccessToken().getJwtToken(),
        });

        // clear query client, so that it uses new accessToken
        queryClient.clear();
      }
    );
  }, []);
};
