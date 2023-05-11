import { CategoryType, IListCategoriesQueryDto } from '@lib/shared';
import { IsEnum, IsOptional } from 'class-validator';

export class ListCategoriesQueryDto implements IListCategoriesQueryDto {
  @IsOptional()
  @IsEnum(CategoryType)
  readonly type?: CategoryType;
}
