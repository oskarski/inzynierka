import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { IShoppingListItemDto } from '@lib/shared';
import {
  BulkAddToShoppingListDto,
  BulkDeleteShoppingListItemsDto,
  UpdateShoppingListItemDto,
} from './dtos';
import { User } from '../iam/entities';

@Controller('shopping-list')
@UseGuards(PrivateApiGuard)
export class ShoppingListController {
  constructor() {}

  @Get()
  async listShoppingListItems(): Promise<IShoppingListItemDto[]> {
    // TODO Drop hardcoded list
    return [
      {
        id: '1',
        name: 'Pomidorki koktajlowe',
        quantity: 0.5,
        unit: 'kg',
        completed: false,
      },
      {
        id: '2',
        name: 'Pomidory w puszce',
        quantity: 400,
        unit: 'ml',
        completed: true,
      },
      {
        id: '3',
        name: 'Ząbek czosnku',
        quantity: 1,
        unit: 'szt.',
        completed: false,
      },
    ] as IShoppingListItemDto[];
  }

  @Post('/bulk')
  bulkAddToShoppingList(
    @Body() dto: BulkAddToShoppingListDto,
    @CurrentUser() currentUser: User,
  ): Promise<IShoppingListItemDto[]> {
    // TODO Add to shopping list logic

    return this.listShoppingListItems();
  }

  @Put(':id')
  updateShoppingListItem(
    @Body() dto: UpdateShoppingListItemDto,
    @CurrentUser() currentUser: User,
  ): Promise<IShoppingListItemDto[]> {
    // TODO Update shopping list item logic

    return this.listShoppingListItems();
  }

  @Delete('/bulk')
  bulkDeleteShoppingListItems(
    @Body() dto: BulkDeleteShoppingListItemsDto,
    @CurrentUser() currentUser: User,
  ): Promise<IShoppingListItemDto[]> {
    // TODO Delete shopping list items logic

    return this.listShoppingListItems();
  }
}
