import { useConfirmSignUp } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';
import { UserId } from '@lib/shared';

interface SignUpConfirmFormProps {
  userId: UserId;
  email: string;
}

export const SignUpConfirmForm = ({
  userId,
  email,
}: SignUpConfirmFormProps) => {
  const { redirectTo } = useRouting();

  const [confirmSignUp, loading, error] = useConfirmSignUp(userId, email, {
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
