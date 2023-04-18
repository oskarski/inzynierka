import { HttpClient, routes } from '@fe/utils';
import { withSSRContext } from 'aws-amplify';
import { IamApi, ISignedInUserDto, SignedInUserQueryKey } from '@fe/iam';
import { GetServerSidePropsWithQueryClient } from './server-react-query';

export const SignedInGuard = (
  getServerSideProps: (
    ctx: Parameters<GetServerSidePropsWithQueryClient>[0],
    queryClient: Parameters<GetServerSidePropsWithQueryClient>[1],
    user: ISignedInUserDto
  ) => ReturnType<GetServerSidePropsWithQueryClient> = async () => ({
    props: {},
  })
): GetServerSidePropsWithQueryClient => {
  return async (ctx, queryClient) => {
    const { Auth } = withSSRContext({ req: ctx.req });

    return new IamApi(HttpClient.publicHttpClient(''))
      .signedInUser(Auth)
      .then(async (user) => {
        if (!user) return Promise.reject();

        queryClient.setQueryData(SignedInUserQueryKey, user);

        return getServerSideProps(ctx, queryClient, user);
      })
      .catch(() => ({
        redirect: {
          destination: routes.signIn(),
          permanent: false,
        },
      }));
  };
};
