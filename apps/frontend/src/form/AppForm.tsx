import { Form } from 'antd-mobile';
import {
  ApiErrorMessage,
  FormValidationOrApiError,
  FormValidationSummaryErrorMessage,
} from '@fe/errors';
import { PropsWithChildren, ReactNode } from 'react';

interface AppFormProps {
  onSubmit: (values: any) => void;
  submitBtn: ReactNode;
  error: FormValidationOrApiError | null;
}

export const AppForm = ({
  error,
  onSubmit,
  submitBtn,
  children,
}: PropsWithChildren<AppFormProps>) => {
  return (
    <Form
      onFinish={onSubmit}
      footer={
        <>
          {submitBtn}

          <FormValidationSummaryErrorMessage error={error} className="mt-2" />
          <ApiErrorMessage error={error} className="mt-2" />
        </>
      }
      style={{
        '--border-inner': '0',
        '--border-top': '0',
        '--border-bottom': '0',
      }}
    >
      {children}
    </Form>
  );
};
