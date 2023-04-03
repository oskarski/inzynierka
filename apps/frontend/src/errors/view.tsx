import { HTMLAttributes } from 'react';
import {
  ApiError,
  FormValidationError,
  FormValidationOrApiError,
} from './errors';
import classNames from 'classnames';

interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
  block?: boolean;
  size?: 'sm' | 'base';
}

function ErrorMessage({ block, size = 'sm', ...props }: ErrorMessageProps) {
  return (
    <span
      {...props}
      className={classNames(
        `text-red-700 text-${size}`,
        { 'inline-block': !block, block: block },
        props.className
      )}
    />
  );
}

interface FormValidationErrorMessageProps extends ErrorMessageProps {
  error: FormValidationOrApiError | null;
  name: string;
}

export function FormValidationErrorMessage({
  error,
  name,
  ...props
}: FormValidationErrorMessageProps) {
  if (!error || !(error instanceof FormValidationError)) return null;

  return (
    <ErrorMessage {...props} data-testid={`error-msg-${name}`}>
      {error.errorsMap[name]}
    </ErrorMessage>
  );
}

interface FormValidationSummaryErrorMessageProps extends ErrorMessageProps {
  error: FormValidationOrApiError | null;
}

export function FormValidationSummaryErrorMessage({
  error,
  ...props
}: FormValidationSummaryErrorMessageProps) {
  if (!error || !(error instanceof FormValidationError)) return null;

  return <ErrorMessage {...props}>Formularz zawiera błędy</ErrorMessage>;
}

interface ApiErrorMessageProps extends ErrorMessageProps {
  error: FormValidationOrApiError | null;
}

export function ApiErrorMessage({ error, ...props }: ApiErrorMessageProps) {
  if (!error || !(error instanceof ApiError)) return null;

  return <ErrorMessage {...props}>{error.message}</ErrorMessage>;
}
