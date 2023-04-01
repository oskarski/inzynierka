import { useConfirmSignUp } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';

interface SignUpConfirmFormProps {
  email: string;
}

export const SignUpConfirmForm = ({ email }: SignUpConfirmFormProps) => {
  const [confirmSignUp, loading, error] = useConfirmSignUp(email);

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
