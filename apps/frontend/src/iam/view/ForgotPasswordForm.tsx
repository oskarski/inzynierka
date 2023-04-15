import { useForgotPassword } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
}

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const [forgotPassword, loading, error] = useForgotPassword({
    onSuccess: (formValues) => onSuccess(formValues.email),
  });

  return (
    <AppForm
      onSubmit={forgotPassword}
      error={error}
      submitBtn={<SubmitButton loading={loading}>Resetuj hasło</SubmitButton>}
    >
      <TextField name="email" label="Email" error={error} />
    </AppForm>
  );
};
