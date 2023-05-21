import {
  IBulkDeleteShoppingListItemsDto,
  ShoppingListItemId,
} from '@lib/shared';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class BulkDeleteShoppingListItemsDto
  implements IBulkDeleteShoppingListItemsDto
{
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  readonly itemIds: ShoppingListItemId[];
}
