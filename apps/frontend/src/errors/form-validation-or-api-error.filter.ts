import { ZodError } from 'zod';
import { ApiError, FormValidationError } from './errors';

export const catchFormValidationOrApiError = (error: Error) => {
  if (error instanceof ZodError)
    return Promise.reject(new FormValidationError(error));

  return Promise.reject(new ApiError(error.message));
};
