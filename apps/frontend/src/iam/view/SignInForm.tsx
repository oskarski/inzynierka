import { useSignIn } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';
import Link from 'next/link';
import { Button } from 'antd-mobile';

export const SignInForm = () => {
  const { redirectTo } = useRouting();

  const [signIn, loading, error] = useSignIn({
    onSuccess: () => redirectTo(routes.home()),
  });

  return (
    <AppForm
      onSubmit={signIn}
      error={error}
      submitBtn={
        <>
          <SubmitButton loading={loading}>Zaloguj</SubmitButton>

          <Link href={routes.signUp()} className="block mt-3">
            <Button fill="outline" block={true} color="primary" size="large">
              Załóż konto
            </Button>
          </Link>
        </>
      }
    >
      <TextField type="email" name="email" label="Email" error={error} />

      <TextField type="password" name="password" label="Hasło" error={error} />

      <Link href={routes.forgotPassword()}>Zapomniałeś hasła?</Link>
    </AppForm>
  );
};
