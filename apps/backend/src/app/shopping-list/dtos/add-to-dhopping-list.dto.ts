import {
  IAddToShoppingListItemDto,
  IBulkAddToShoppingListDto,
  IngredientId,
} from '@lib/shared';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class AddToShoppingListItemDto implements IAddToShoppingListItemDto {
  @IsUUID()
  readonly ingredientId: IngredientId;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  readonly quantity: number;

  @IsString()
  readonly unit: string;
}

export class BulkAddToShoppingListDto implements IBulkAddToShoppingListDto {
  @ValidateNested({ each: true })
  @Type(() => AddToShoppingListItemDto)
  readonly items: AddToShoppingListItemDto[];
}
