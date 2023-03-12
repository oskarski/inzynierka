import { assertIsDefined } from './ts-helpers';

interface IEnvVariables {
  apiUrl: string;
}

export const env = (): IEnvVariables => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  assertIsDefined(apiUrl, 'NEXT_PUBLIC_API_URL env must be set!');

  return {
    apiUrl,
  };
};
