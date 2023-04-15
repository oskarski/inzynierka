import { useConfirmForgotPassword } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';

interface ForgotPasswordConfirmFormProps {
  email: string;
}

export const ForgotPasswordSubmitForm = ({
  email,
}: ForgotPasswordConfirmFormProps) => {
  const { redirectTo } = useRouting();

  const [confirmForgotPassword, loading, error] = useConfirmForgotPassword(
    email,
    {
      onSuccess: () => redirectTo(routes.signIn()),
    }
  );

  return (
    <AppForm
      onSubmit={confirmForgotPassword}
      error={error}
      submitBtn={<SubmitButton loading={loading}>Potwierdź</SubmitButton>}
    >
      <TextField name="code" label="Kod" error={error} />
      <TextField
        type="password"
        name="password"
        label="Nowe hasło"
        error={error}
      />
    </AppForm>
  );
};
