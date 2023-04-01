import { useSignIn } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';

export const SignInForm = () => {
  const { redirectTo } = useRouting();

  const [signIn, loading, error] = useSignIn({
    onSuccess: () => redirectTo(routes.home()),
  });

  return (
    <AppForm
      onSubmit={signIn}
      error={error}
      submitBtn={<SubmitButton loading={loading}>Zaloguj</SubmitButton>}
    >
      <TextField name="email" label="Email" error={error} />

      <TextField type="password" name="password" label="Hasło" error={error} />
    </AppForm>
  );
};
