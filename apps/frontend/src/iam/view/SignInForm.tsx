import { useSignIn } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';

export const SignInForm = () => {
  const [signIn, loading, error] = useSignIn();

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
