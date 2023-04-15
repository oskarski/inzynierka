import { useSignUp } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';

export const SignUpForm = () => {
  const { redirectTo } = useRouting();

  const [signUp, loading, error] = useSignUp({
    onSuccess: (userId, { email }) =>
      redirectTo(routes.signUpConfirm(userId, btoa(email))),
  });

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
