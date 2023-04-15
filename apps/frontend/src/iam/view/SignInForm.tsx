import { useSignIn } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';
import Link from 'next/link';


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
      <div>
        <Link href="/forgot-password">
          Zapomniałeś hasła?
        </Link>
      </div>
    </AppForm>
  );
};
