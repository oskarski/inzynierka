import { Checkbox, Form, Input, Radio, Stepper, TextArea } from 'antd-mobile';
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
  errorNamePrefix?: string;
}

export const TextAreaField = ({
  error,
  rows,
  placeholder,
  errorNamePrefix = '',
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
        name={`${errorNamePrefix}${props.name}`}
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

interface RadioFieldProps extends ComponentProps<typeof Form.Item> {
  error: FormValidationOrApiError | null;
  name: string;
  options: Array<{ value: string | number; label: ReactNode }>;
  defaultValue?: string | number;
}

export const RadioField = ({
  error,
  options,
  defaultValue,
  ...props
}: RadioFieldProps) => {
  return (
    <>
      <Form.Item {...props}>
        <Radio.Group defaultValue={defaultValue}>
          <div className="px-2 -mx-2">
            {options.map((option) => (
              <Radio
                key={option.value}
                className="px-2 mb-3"
                value={option.value}
              >
                {option.label}
              </Radio>
            ))}
          </div>
        </Radio.Group>
      </Form.Item>

      <FormValidationErrorMessage
        error={error}
        name={props.name}
        block={true}
        className="-mt-2 relative"
      />
    </>
  );
};

interface CheckboxFieldProps extends ComponentProps<typeof Form.Item> {
  error: FormValidationOrApiError | null;
  name: string;
  options: Array<{ value: string | number; label: string }>;
}

export const CheckboxField = ({
  error,
  options,
  ...props
}: CheckboxFieldProps) => {
  return (
    <>
      <Form.Item {...props}>
        <Checkbox.Group>
          <div className="px-2 -mx-2">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                className="px-2 mb-3"
                value={option.value}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
      </Form.Item>

      <FormValidationErrorMessage
        error={error}
        name={props.name}
        block={true}
        className="-mt-2 relative"
      />
    </>
  );
};
