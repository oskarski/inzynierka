import { assertIsDefined } from '@fe/utils';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IReviewsApi } from './ReviewsApi';

interface IReviewsApiContext {
  readonly reviewsApi: IReviewsApi;
}

const ReviewsApiContext = createContext<Partial<IReviewsApiContext>>({});

export const ReviewsApiProvider = ({
  children,
  ...props
}: PropsWithChildren<IReviewsApiContext>) => {
  return (
    <ReviewsApiContext.Provider value={props}>
      {children}
    </ReviewsApiContext.Provider>
  );
};

export const useReviewsApi = (): IReviewsApiContext => {
  const { reviewsApi } = useContext(ReviewsApiContext);

  assertIsDefined(reviewsApi, 'IReviewsApiContext.reviewsApi must be defined!');

  return { reviewsApi };
};
