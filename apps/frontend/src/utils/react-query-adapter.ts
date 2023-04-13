import {
  useQuery,
  useMutation,
  QueryKey,
  QueryFunction,
  UseQueryResult,
  MutationFunction,
  UseMutateFunction,
  UseMutationOptions,
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryResult,
} from 'react-query';
import { IPaginated } from '@lib/shared';

export function useAdaptedQuery<ApiReturnType, ReturnType = ApiReturnType>(
  queryKey: QueryKey,
  fn: QueryFunction<ApiReturnType>,
  options?: {
    keepPreviousData?: boolean;
    onSuccess?: (data: ReturnType) => void;
    select?: (data: ApiReturnType) => ReturnType;
  }
):
  | [undefined, true, Error | null, UseQueryResult<ReturnType, Error>]
  | [undefined, false, Error, UseQueryResult<ReturnType, Error>]
  | [ReturnType, false, null, UseQueryResult<ReturnType, Error>] {
  const queryResult = useQuery<ApiReturnType, Error, ReturnType>(
    queryKey,
    fn,
    options
  );

  if (queryResult.isLoading)
    return [
      queryResult.data,
      queryResult.isLoading,
      queryResult.error,
      queryResult,
    ] as [undefined, true, Error | null, UseQueryResult<ReturnType, Error>];

  if (queryResult.error)
    return [
      queryResult.data,
      queryResult.isLoading,
      queryResult.error,
      queryResult,
    ] as [undefined, false, Error, UseQueryResult<ReturnType, Error>];

  return [
    queryResult.data,
    queryResult.isLoading,
    queryResult.error,
    queryResult,
  ] as [ReturnType, false, null, UseQueryResult<ReturnType, Error>];
}

export function usePaginatedQuery<ApiReturnType, ReturnType = ApiReturnType>(
  queryKey: QueryKey,
  fn: QueryFunction<IPaginated<ApiReturnType>>,
  perPage: number,
  options?: {
    select?: (
      data: InfiniteData<IPaginated<ApiReturnType>>
    ) => InfiniteData<IPaginated<ReturnType>>;
  }
):
  | [
      ReturnType[] | undefined,
      true,
      null,
      { loadMore: () => Promise<void>; hasMore: boolean },
      UseInfiniteQueryResult<IPaginated<ReturnType>, Error>
    ]
  | [
      ReturnType[] | undefined,
      false,
      Error,
      { loadMore: () => Promise<void>; hasMore: boolean },
      UseInfiniteQueryResult<IPaginated<ReturnType>, Error>
    ]
  | [
      ReturnType[],
      false,
      null,
      { loadMore: () => Promise<void>; hasMore: boolean },
      UseInfiniteQueryResult<IPaginated<ReturnType>, Error>
    ] {
  const queryResult = useInfiniteQuery<
    IPaginated<ApiReturnType>,
    Error,
    IPaginated<ReturnType>
  >(queryKey, fn, {
    ...options,
    getNextPageParam: (lastPage, allPages) => {
      const page = allPages.length - 1;

      if ((page + 1) * perPage >= lastPage.total) return undefined;

      return allPages.length;
    },
  });

  const items = queryResult.data?.pages.reduce<ReturnType[]>(
    (prev, curr) => [...prev, ...curr.data],
    []
  );

  const loadMore = async () => {
    await queryResult.fetchNextPage();
  };

  if (queryResult.isLoading)
    return [
      items,
      queryResult.isLoading,
      queryResult.error,
      { loadMore, hasMore: !!queryResult.hasNextPage },
      queryResult,
    ] as [
      ReturnType[] | undefined,
      true,
      null,
      { loadMore: () => Promise<void>; hasMore: boolean },
      UseInfiniteQueryResult<IPaginated<ReturnType>, Error>
    ];

  if (queryResult.error)
    return [
      items,
      queryResult.isLoading,
      queryResult.error,
      { loadMore, hasMore: !!queryResult.hasNextPage },
      queryResult,
    ] as [
      ReturnType[] | undefined,
      false,
      Error,
      { loadMore: () => Promise<void>; hasMore: boolean },
      UseInfiniteQueryResult<IPaginated<ReturnType>, Error>
    ];

  return [
    items,
    queryResult.isLoading,
    queryResult.error,
    { loadMore, hasMore: !!queryResult.hasNextPage },
    queryResult,
  ] as [
    ReturnType[],
    false,
    null,
    { loadMore: () => Promise<void>; hasMore: boolean },
    UseInfiniteQueryResult<IPaginated<ReturnType>, Error>
  ];
}

export function useAdaptedMutation<
  PayloadType = unknown,
  ArgumentsType = void,
  ErrorType = Error
>(
  mutationFn: MutationFunction<PayloadType, ArgumentsType>,
  options?: UseMutationOptions<PayloadType, ErrorType, ArgumentsType>
): [
  UseMutateFunction<PayloadType, ErrorType, ArgumentsType>,
  boolean,
  ErrorType | null
] {
  const { mutate, isLoading, error } = useMutation<
    PayloadType,
    ErrorType,
    ArgumentsType
  >(mutationFn, options);

  return [mutate, isLoading, error];
}
