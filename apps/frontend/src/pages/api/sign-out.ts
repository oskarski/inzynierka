import { NextApiRequest, NextApiResponse } from 'next';
import { routes } from '@fe/utils';
import { withSSRContext } from 'aws-amplify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Auth } = withSSRContext({ req });

  await Auth.signOut();
  await res.redirect(routes.signIn());
}
