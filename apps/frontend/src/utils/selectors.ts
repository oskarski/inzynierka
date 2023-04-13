import { IPaginated } from '@lib/shared';

export function PaginationSelector<Dto, Model>(
  ListItemSelector: (dto: Dto) => Model
): (paginationDto: IPaginated<Dto>) => IPaginated<Model> {
  return function (paginationDto: IPaginated<Dto>) {
    return {
      total: paginationDto.total,
      data: paginationDto.data.map(ListItemSelector),
    };
  };
}
