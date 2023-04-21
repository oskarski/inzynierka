import { get } from 'lodash';
import { GetStaticProps } from 'next/types';

export const PublicPage = (
  getStaticProps: GetStaticProps = async () => ({
    props: {},
  })
): GetStaticProps => {
  return async (ctx) => {
    const result = await getStaticProps(ctx);

    const props = get(result, 'props', {});

    return {
      ...result,
      props: {
        ...props,
        isPublicPage: true,
      },
    };
  };
};
