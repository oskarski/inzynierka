import { useIam } from '../Iam.context';
import { useAdaptedMutation } from '@fe/utils';
import {
  IConfirmSignUpDto,
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
      onSuccess,
    }
  );
};
