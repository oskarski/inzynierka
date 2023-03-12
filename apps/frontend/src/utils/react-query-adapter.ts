import { useQuery, QueryKey, QueryFunction, UseQueryResult } from 'react-query';

export function useAdaptedQuery<ReturnType>(
  queryKey: QueryKey,
  fn: QueryFunction<ReturnType>
):
  | [undefined, true, Error | null, UseQueryResult<ReturnType, Error>]
  | [undefined, false, Error, UseQueryResult<ReturnType, Error>]
  | [ReturnType, false, null, UseQueryResult<ReturnType, Error>] {
  const queryResult = useQuery<ReturnType, Error>(queryKey, fn);

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
