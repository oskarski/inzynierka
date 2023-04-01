import { useSignUp } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';

export const SignUpForm = () => {
  const [signUp, loading, error] = useSignUp();

  return (
    <AppForm
      onSubmit={signUp}
      error={error}
      submitBtn={<SubmitButton loading={loading}>Zarejestruj</SubmitButton>}
    >
      <TextField name="firstName" label="Imię" error={error} />

      <TextField name="lastName" label="Nazwisko" error={error} />

      <TextField type="email" name="email" label="Email" error={error} />

      <TextField type="password" name="password" label="Hasło" error={error} />
    </AppForm>
  );
};
