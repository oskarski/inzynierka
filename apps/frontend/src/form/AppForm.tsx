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
  className?: string;
  footerClassName?: string;
}

export const AppForm = ({
  error,
  onSubmit,
  submitBtn,
  className,
  footerClassName,
  children,
}: PropsWithChildren<AppFormProps>) => {
  return (
    <Form
      className={className}
      onFinish={onSubmit}
      footer={
        <div className={footerClassName}>
          {submitBtn}

          <FormValidationSummaryErrorMessage error={error} className="mt-2" />
          <ApiErrorMessage error={error} className="mt-2" />
        </div>
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
