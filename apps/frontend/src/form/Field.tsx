import { Form, Input, Stepper, TextArea } from 'antd-mobile';
import {
  FormValidationErrorMessage,
  FormValidationOrApiError,
} from '@fe/errors';
import React, { ComponentProps, ReactNode } from 'react';

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
        className="-mt-2 relative"
      />
    </>
  );
};

interface TextAreaFieldProps extends ComponentProps<typeof Form.Item> {
  error: FormValidationOrApiError | null;
  rows?: number;
}

export const TextAreaField = ({
  error,
  rows,
  ...props
}: TextAreaFieldProps) => {
  return (
    <>
      <Form.Item {...props}>
        <TextArea id={`${props.name}`} className="border-b" rows={rows} />
      </Form.Item>

      <FormValidationErrorMessage
        error={error}
        name={`${props.name}`}
        block={true}
        className="-mt-2 relative"
      />
    </>
  );
};

interface StepperFieldProps extends ComponentProps<typeof Form.Item> {
  error: FormValidationOrApiError | null;
  min?: number;
  suffix?: ReactNode;
}

export const StepperField = ({
  error,
  label,
  min,
  suffix,
  ...props
}: StepperFieldProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        {label}

        <div className="pl-2 flex items-center">
          <Form.Item {...props}>
            <Stepper defaultValue={props.initialValue} min={min} />
          </Form.Item>

          {suffix}
        </div>
      </div>

      <FormValidationErrorMessage
        error={error}
        name={`${props.name}`}
        block={true}
        className="-mt-2 relative"
      />
    </>
  );
};

interface HiddenProps extends ComponentProps<typeof Form.Item> {}

export const HiddenField = ({ ...props }: HiddenProps) => {
  return (
    <Form.Item {...props}>
      <input type="hidden" defaultValue={props.initialValue} />
    </Form.Item>
  );
};
