import { ZodError } from 'zod';
import { ApiError, FormValidationError } from './errors';

export const catchFormValidationOrApiError = (error: Error) => {
  if (error instanceof ZodError) throw new FormValidationError(error);

  throw new ApiError(error.message);
};
