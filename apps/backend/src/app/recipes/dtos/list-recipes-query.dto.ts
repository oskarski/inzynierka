import { IListRecipesQueryDto } from '@lib/shared';
import { IsNumber, Min, IsInt, Max } from 'class-validator';
import { Transform } from 'class-transformer';

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
}
