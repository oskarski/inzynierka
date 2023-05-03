import {
  IListRecipesIngredientFilterDto,
  IListRecipesQueryDto,
  IngredientId,
} from '@lib/shared';
import {
  IsNumber,
  Min,
  IsInt,
  Max,
  IsArray,
  ValidateNested,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class ListRecipesIngredientFilterDto
  implements IListRecipesIngredientFilterDto
{
  @IsUUID()
  readonly id: IngredientId;
}

export class ListRecipesQueryDto implements IListRecipesQueryDto {
  @IsNumber()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  readonly page: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(20)
  @Transform(({ value }) => parseInt(value, 10))
  readonly perPage: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ListRecipesIngredientFilterDto)
  readonly ingredients?: ListRecipesIngredientFilterDto[];
}
