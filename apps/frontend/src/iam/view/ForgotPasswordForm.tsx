import { useForgotPassword } from '../api';
import { AppForm, SubmitButton, TextField } from '@fe/form';
import { routes, useRouting } from '@fe/utils';

export const ForgotPasswordForm = () => {
    const { redirectTo } = useRouting();

    const [forgotPassword, loading, error] = useForgotPassword({
        onSuccess: () => redirectTo(routes.home()),
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
