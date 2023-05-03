import { IPaginationQueryDto } from '@lib/shared';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto implements IPaginationQueryDto {
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
