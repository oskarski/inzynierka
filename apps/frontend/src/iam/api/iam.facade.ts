import { useIam } from '../Iam.context';
import { useAdaptedMutation } from '@fe/utils';
import { ISignUpDto } from './IamApi';
import {
  catchFormValidationOrApiError,
  FormValidationOrApiError,
} from '@fe/errors';
import { SignUpFormSchema } from './schema/sign-up.schema';

export const useSignUp = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const { iamApi } = useIam();

  return useAdaptedMutation<void, ISignUpDto, FormValidationOrApiError>(
    (formValues) =>
      SignUpFormSchema.parseAsync(formValues)
        .then((dto) => iamApi.signUp(dto))
        .catch(catchFormValidationOrApiError),
    { onSuccess }
  );
};
