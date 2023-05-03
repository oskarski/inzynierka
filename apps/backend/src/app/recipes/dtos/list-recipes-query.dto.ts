import {
  IListRecipesIngredientFilterDto,
  IListRecipesQueryDto,
  IngredientId,
} from '@lib/shared';
import { IsArray, ValidateNested, IsUUID, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from '../../utils';

class ListRecipesIngredientFilterDto
  implements IListRecipesIngredientFilterDto
{
  @IsUUID()
  readonly id: IngredientId;
}

export class ListRecipesQueryDto
  extends PaginationQueryDto
  implements IListRecipesQueryDto
{
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ListRecipesIngredientFilterDto)
  readonly ingredients?: ListRecipesIngredientFilterDto[];
}
