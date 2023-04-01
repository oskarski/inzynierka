import { HTMLAttributes } from 'react';
import { FormValidationError, FormValidationOrApiError } from './errors';
import classNames from 'classnames';

function ErrorMessage(props: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={classNames(
        'inline-block text-red-700 text-sm',
        props.className
      )}
    />
  );
}

interface FormValidationErrorMessageProps
  extends HTMLAttributes<HTMLSpanElement> {
  error: FormValidationOrApiError | null;
  name: string;
}

export function FormValidationErrorMessage({
  error,
  name,
  ...props
}: FormValidationErrorMessageProps) {
  if (!error || !(error instanceof FormValidationError)) return null;

  return <ErrorMessage {...props}>{error.errorsMap[name]}</ErrorMessage>;
}

interface FormValidationSummaryErrorMessageProps
  extends HTMLAttributes<HTMLSpanElement> {
  error: FormValidationOrApiError | null;
}

export function FormValidationSummaryErrorMessage({
  error,
  ...props
}: FormValidationSummaryErrorMessageProps) {
  if (!error || !(error instanceof FormValidationError)) return null;

  return <ErrorMessage {...props}>Formularz zawiera błędy</ErrorMessage>;
}

interface ApiErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
  error: FormValidationOrApiError | null;
}

export function ApiErrorMessage({ error, ...props }: ApiErrorMessageProps) {
  if (!error || !(error instanceof ApiErrorMessage)) return null;

  return <ErrorMessage {...props}>{error.message}</ErrorMessage>;
}
