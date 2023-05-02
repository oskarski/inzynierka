import { ZodError } from 'zod';

export class FormValidationError extends Error {
  readonly errorsMap: Record<string, string> = {};

  constructor(readonly zodError: ZodError) {
    super();

    this.errorsMap = zodError.errors.reduce(
      (prev, current) => ({
        [current.path.join('.')]: current.message,
        // For stringified arrays
        [current.path.join(',')]: current.message,
        ...prev,
      }),
      {}
    );
  }
}

export class ApiError extends Error {}

export type FormValidationOrApiError = FormValidationError | ApiError;
