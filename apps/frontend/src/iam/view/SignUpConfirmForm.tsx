import { useConfirmSignUp } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';

interface SignUpConfirmFormProps {
  email: string;
}

export const SignUpConfirmForm = ({ email }: SignUpConfirmFormProps) => {
  const { redirectTo } = useRouting();

  const [confirmSignUp, loading, error] = useConfirmSignUp(email, {
    onSuccess: () => redirectTo(routes.signIn()),
  });

  return (
    <AppForm
      onSubmit={confirmSignUp}
      error={error}
      submitBtn={<SubmitButton loading={loading}>Potwierdź</SubmitButton>}
    >
      <TextField name="code" label="Kod" error={error} />
    </AppForm>
  );
};
