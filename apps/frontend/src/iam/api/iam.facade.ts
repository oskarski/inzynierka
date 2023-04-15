import { useIam } from '../Iam.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import { IIamApi, ISignedInUserDto, ISignInDto,IConfirmForgotPasswordDto } from './IamApi';
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
import { ConfirmForgotPasswordFormSchema } from '@fe/iam/api/schema/confirm-forgot-password.schema';

const SignedInUserQueryKey = ['iamApi', 'signedInUser'];

export const useSignUp = ({
  onSuccess,
}: {
  onSuccess: (userId: UserId, formValues: SignUpFormValue) => void;
}) => {
  const { iamApi } = useIam();

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
  const { iamApi } = useIam();

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

export const useSignOut = (
  iamApi: IIamApi,
  signOutFormRef: RefObject<HTMLFormElement>
) => {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    if (!signOutFormRef.current) return;

    queryClient.clear();
    queryClient.setQueryData(SignedInUserQueryKey, null);

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
}: {
  onSuccess: (formValues: ForgotPasswordFormValues) => void;
}) => {
  const { iamApi } = useIam();

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
  const { iamApi } = useIam();

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

export const useRefreshSession = (iamApi: IIamApi, signOut: () => void) => {
  const queryClient = useQueryClient();

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
