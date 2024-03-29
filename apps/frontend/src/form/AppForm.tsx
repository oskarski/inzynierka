import { Form } from 'antd-mobile';
import {
  ApiErrorMessage,
  FormValidationOrApiError,
  FormValidationSummaryErrorMessage,
} from '@fe/errors';
import { ComponentProps, PropsWithChildren, ReactNode } from 'react';

interface AppFormProps {
  onSubmit: (values: any) => void;
  submitBtn: ReactNode;
  error: FormValidationOrApiError | null;
  className?: string;
  footerClassName?: string;
  form?: ComponentProps<typeof Form>['form'];
}

export const AppForm = ({
  error,
  onSubmit,
  submitBtn,
  className,
  footerClassName,
  form,
  children,
}: PropsWithChildren<AppFormProps>) => {
  return (
    <Form
      className={className}
      onFinish={onSubmit}
      form={form}
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
