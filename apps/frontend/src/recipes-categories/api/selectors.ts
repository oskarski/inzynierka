import {
  IListCategoriesQueryDto,
  IRecipeCategoryListItemDto,
} from '@lib/shared';

export const FilterCategoriesSelector =
  (queryDto: IListCategoriesQueryDto = {}) =>
  (dto: IRecipeCategoryListItemDto[]): IRecipeCategoryListItemDto[] =>
    dto.filter((dtoItem) => {
      if (queryDto.type) return dtoItem.type === queryDto.type;

      return true;
    });
