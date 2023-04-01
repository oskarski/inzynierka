import { useIam } from '../Iam.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import {
  IConfirmSignUpDto,
  IIamApi,
  ISignedInUserDto,
  ISignInDto,
  ISignUpDto,
} from './IamApi';
import {
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { SignUpFormSchema } from './schema/sign-up.schema';
import { ConfirmSignUpFormSchema } from './schema/confirm-sign-up.schema';
import { SignInFormSchema } from './schema/sign-in.schema';
import { RefObject, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { Auth } from 'aws-amplify';

const SignedInUserQueryKey = ['iamApi', 'signedInUser'];

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