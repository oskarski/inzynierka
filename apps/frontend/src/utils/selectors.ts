import { IPaginated } from '@lib/shared';
import { InfiniteData } from 'react-query';

export function PaginationSelector<Dto, Model>(
  ListItemSelector: (dto: Dto) => Model
): (
  infinitePagination: InfiniteData<IPaginated<Dto>>
) => InfiniteData<IPaginated<Model>> {
  return function (infinitePagination: InfiniteData<IPaginated<Dto>>) {
    infinitePagination.pages.map((page) => ({
      total: page.total,
      data: page.data.map(ListItemSelector),
    }));

    return {
      ...infinitePagination,
      pages: infinitePagination.pages.map((page) => ({
        total: page.total,
        data: page.data.map(ListItemSelector),
      })),
    };
  };
}
