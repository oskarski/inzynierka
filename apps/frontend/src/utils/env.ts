import { assertIsDefined } from './ts-helpers';

interface IEnvVariables {
  apiUrl: string;
  cognito: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
}

export const env = (): IEnvVariables => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cognitoRegion = process.env.NEXT_PUBLIC_COGNITO_REGION;
  const cognitoUserPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const cognitoUserPoolWebClientId =
    process.env.NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID;

  assertIsDefined(apiUrl, 'NEXT_PUBLIC_API_URL env must be set!');
  assertIsDefined(cognitoRegion, 'NEXT_PUBLIC_COGNITO_REGION env must be set!');
  assertIsDefined(
    cognitoUserPoolId,
    'NEXT_PUBLIC_COGNITO_USER_POOL_ID env must be set!'
  );
  assertIsDefined(
    cognitoUserPoolWebClientId,
    'NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID env must be set!'
  );

  return {
    apiUrl,
    cognito: {
      region: cognitoRegion,
      userPoolId: cognitoUserPoolId,
      userPoolWebClientId: cognitoUserPoolWebClientId,
    },
  };
};
