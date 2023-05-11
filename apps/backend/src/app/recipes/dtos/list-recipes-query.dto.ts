import {
  IListRecipesIngredientFilterDto,
  IListRecipesQueryDto,
  IngredientId,
  RecipeCategoryId,
} from '@lib/shared';
import {
  IsArray,
  ValidateNested,
  IsUUID,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
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

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  readonly minPreparationTime?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  readonly maxPreparationTime?: number;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  readonly dishTypeCategoryIds?: RecipeCategoryId[];
}
