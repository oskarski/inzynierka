import { useIam } from '../Iam.context';
import { useAdaptedMutation } from '@fe/utils';
import { ISignUpDto } from './IamApi';

export const useSignUp = () => {
  const { iamApi } = useIam();

  return useAdaptedMutation((dto: ISignUpDto) => iamApi.signUp(dto));
};
