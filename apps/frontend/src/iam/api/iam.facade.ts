import { useIamApi } from './IamApi.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import {
  ISignedInUserDto,
  ISignInDto,
  IConfirmForgotPasswordDto,
} from './IamApi';
import { ISignUpDto, IConfirmSignUpDto, UserId } from '@lib/shared';
import {
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { SignUpFormSchema, SignUpFormValue } from './schema/sign-up.schema';
import { ConfirmSignUpFormSchema } from './schema/confirm-sign-up.schema';
import { SignInFormSchema } from './schema/sign-in.schema';
import {
  ForgotPasswordFormValues,
  ForgotPasswordSchema,
} from './schema/forgot-password.schema';
import { RefObject, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { ConfirmForgotPasswordFormSchema } from './schema/confirm-forgot-password.schema';

const SignedInUserQueryKey = ['iamApi', 'signedInUser'];

export const useSignUp = ({
  onSuccess,
}: {
  onSuccess: (userId: UserId, formValues: SignUpFormValue) => void;
}) => {
  const { iamApi } = useIamApi();

  return useAdaptedMutation<UserId, ISignUpDto, FormValidationOrApiError>(
    (formValues) =>
      SignUpFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.signUp(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (userId, formValues) => onSuccess(userId, formValues),
    }
  );
};

export const useConfirmSignUp = (
  userId: UserId,
  email: string,
  { onSuccess }: { onSuccess: () => void }
) => {
  const { iamApi } = useIamApi();

  return useAdaptedMutation<void, IConfirmSignUpDto, FormValidationOrApiError>(
    (formValues) =>
      ConfirmSignUpFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.confirmSignUp(userId, { email, ...dto }))
        .catch(catchFormValidationOrApiError),
    { onSuccess }
  );
};

export const useSignIn = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  const { iamApi } = useIamApi();

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
  const { iamApi } = useIamApi();

  return useCallback(async () => {
    if (!signOutFormRef.current) return;

    await iamApi.signOut();
    queryClient.clear();
    queryClient.setQueryData(SignedInUserQueryKey, null);

    signOutFormRef.current.submit();
  }, []);
};

export const useSignedInUser = () => {
  const { iamApi } = useIamApi();

  return useAdaptedQuery<ISignedInUserDto | null>(SignedInUserQueryKey, () =>
    iamApi.signedInUser()
  );
};

export const useForgotPassword = ({
  onSuccess,
}: {
  onSuccess: (formValues: ForgotPasswordFormValues) => void;
}) => {
  const { iamApi } = useIamApi();

  return useAdaptedMutation<
    void,
    ForgotPasswordFormValues,
    FormValidationOrApiError
  >(
    (formValues) =>
      ForgotPasswordSchema.parseAsync(formValues)
        .then((dto) => iamApi.forgotPassword(dto))
        .catch(catchFormValidationOrApiError),
    {
      onSuccess: (response, formValues) => onSuccess(formValues),
    }
  );
};

export const useConfirmForgotPassword = (
  email: string,
  { onSuccess }: { onSuccess?: () => void } = {}
) => {
  const { iamApi } = useIamApi();

  return useAdaptedMutation<
    void,
    IConfirmForgotPasswordDto,
    FormValidationOrApiError
  >(
    (formValues) =>
      ConfirmForgotPasswordFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.confirmForgotPassword({ email, ...dto }))
        .catch(catchFormValidationOrApiError),
    { onSuccess }
  );
};

export const useRefreshSession = (signOut: () => void) => {
  const queryClient = useQueryClient();
  const { iamApi } = useIamApi();

  return useCallback(async () => {
    try {
      const accessToken = await iamApi.refreshSession();

      const signedInUser =
        queryClient.getQueryData<ISignedInUserDto>(SignedInUserQueryKey);

      queryClient.setQueryData(SignedInUserQueryKey, {
        ...signedInUser,
        accessToken,
      });

      // clear query client, so that it uses new accessToken
      queryClient.clear();
    } catch (err) {
      signOut();
    }
  }, []);
};
