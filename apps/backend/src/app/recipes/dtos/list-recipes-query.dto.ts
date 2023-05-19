import {
  IListRecipesIngredientFilterDto,
  IListRecipesQueryDto,
  IngredientId,
  RecipeCategoryId,
  RecipeDifficulty,
} from '@lib/shared';
import {
  IsArray,
  ValidateNested,
  IsUUID,
  IsOptional,
  IsInt,
  IsPositive,
  IsEnum,
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

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  readonly cuisineTypeCategoryIds?: RecipeCategoryId[];

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  readonly dietTypeCategoryIds?: RecipeCategoryId[];

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  readonly otherCategoryIds?: RecipeCategoryId[];

  @IsOptional()
  @IsArray()
  @IsEnum(RecipeDifficulty, { each: true })
  readonly difficulty?: RecipeDifficulty[];
}
