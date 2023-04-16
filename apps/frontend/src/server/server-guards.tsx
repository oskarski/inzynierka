import { routes } from '@fe/utils';
import { withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';

export const SignedInGuard = (
  getServerSideProps: GetServerSideProps = async () => ({ props: {} })
): GetServerSideProps => {
  return async (ctx) => {
    const { Auth } = withSSRContext({ req: ctx.req });

    return Auth.currentAuthenticatedUser()
      .then(() => getServerSideProps(ctx))
      .catch(() => ({
        redirect: {
          destination: routes.signIn(),
          permanent: false,
        },
      }));
  };
};

export const NotSignedInGuard = (
  getServerSideProps: GetServerSideProps = async () => ({ props: {} })
): GetServerSideProps => {
  return async (ctx) => {
    const { Auth } = withSSRContext({ req: ctx.req });

    return Auth.currentAuthenticatedUser()
      .then(() => ({
        redirect: {
          destination: routes.home(),
          permanent: false,
        },
      }))
      .catch(() => getServerSideProps(ctx));
  };
};
