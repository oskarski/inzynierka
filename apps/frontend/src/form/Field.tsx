import { Form, Input, Stepper, TextArea } from 'antd-mobile';
import {
  FormValidationErrorMessage,
  FormValidationOrApiError,
} from '@fe/errors';
import React, { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { PickerBasedSelect } from '@fe/components';

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
  placeholder?: string;
}

export const TextAreaField = ({
  error,
  rows,
  placeholder,
  ...props
}: TextAreaFieldProps) => {
  return (
    <>
      <Form.Item {...props}>
        <TextArea
          id={`${props.name}`}
          className="border-b"
          rows={rows}
          placeholder={placeholder}
        />
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
  step?: number;
  suffix?: ReactNode;
}

export const StepperField = ({
  error,
  label,
  min,
  step,
  suffix,
  ...props
}: StepperFieldProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        {label}

        <div className="pl-2 flex items-center">
          <Form.Item {...props}>
            <Stepper defaultValue={props.initialValue} min={min} step={step} />
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

interface PickerBasedSelectFieldProps extends ComponentProps<typeof Form.Item> {
  error: FormValidationOrApiError | null;
  options: ComponentProps<typeof PickerBasedSelect>['options'];
}

export const PickerBasedSelectField = ({
  error,
  options,
  children,
  ...props
}: PropsWithChildren<PickerBasedSelectFieldProps>) => {
  return (
    <>
      <Form.Item {...props}>
        <PickerBasedSelect options={options} />
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

interface HiddenProps extends ComponentProps<typeof Form.Item> {}

export const HiddenField = ({ ...props }: HiddenProps) => {
  return (
    <Form.Item {...props}>
      <input type="hidden" />
    </Form.Item>
  );
};
