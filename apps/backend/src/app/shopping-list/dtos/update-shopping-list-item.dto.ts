import { IUpdateShoppingListItemDto } from '@lib/shared';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateShoppingListItemDto implements IUpdateShoppingListItemDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  readonly quantity: number;

  @IsString()
  readonly unit: string;

  @IsBoolean()
  readonly completed: boolean;
}
