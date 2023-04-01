import { Form, Input } from 'antd-mobile';
import {
  FormValidationErrorMessage,
  FormValidationOrApiError,
} from '@fe/errors';
import { ComponentProps } from 'react';

interface TextFieldProps extends ComponentProps<typeof Form.Item> {
  error: FormValidationOrApiError | null;
  type?: 'text' | 'email' | 'password';
}

export const TextField = ({
  error,
  type = 'text',
  ...props
}: TextFieldProps) => {
  return (
    <>
      <Form.Item {...props}>
        <Input id={`${props.name}`} type={type} className="border-b" />
      </Form.Item>

      <FormValidationErrorMessage
        error={error}
        name={`${props.name}`}
        block={true}
        className="pl-4 -mt-2 relative"
      />
    </>
  );
};
