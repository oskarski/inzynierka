import { GetServerSideProps } from 'next/types';
import { dehydrate, QueryClient } from 'react-query';

export type GetServerSidePropsWithQueryClient = (
  ctx: Parameters<GetServerSideProps>[0],
  queryClient: QueryClient
) => ReturnType<GetServerSideProps>;

export const HydrateReactQueryState = (
  getServerSidePropsWithQueryClient: GetServerSidePropsWithQueryClient
): GetServerSideProps => {
  const queryClient = new QueryClient();

  return (ctx) =>
    getServerSidePropsWithQueryClient(ctx, queryClient).then(
      (serverSidePropsOutput) => {
        // @ts-ignore
        const props: Record<string, any> = serverSidePropsOutput['props'] || {};

        return {
          ...serverSidePropsOutput,
          props: {
            ...props,
            dehydratedReactQueryState: dehydrate(queryClient),
          },
        };
      }
    );
};
