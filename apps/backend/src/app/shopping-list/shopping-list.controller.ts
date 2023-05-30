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
import { IShoppingListItemDto, ShoppingListItemId } from '@lib/shared';
import {
  BulkAddToShoppingListDto,
  BulkDeleteShoppingListItemsDto,
  UpdateShoppingListItemDto,
} from './dtos';
import { User } from '../iam/entities';
import { ShoppingListService } from './services';
import { ShoppingList } from './entities';
import { Ingredient } from '../ingredients/entities';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Controller('shopping-list')
@UseGuards(PrivateApiGuard)
export class ShoppingListController {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,
    private readonly shoppingListService: ShoppingListService,
  ) {}

  @Get()
  async listShoppingListItems(): Promise<IShoppingListItemDto[]> {
    const shoppingListItems =
      await this.shoppingListService.listShoppingListItems();

    const shoppingListItemDtos: IShoppingListItemDto[] = await Promise.all(
      shoppingListItems.map(async (item) => {
        const query = `SELECT name FROM ingredients WHERE id = '${item.ingredient_id}'`;
        const result = await this.ingredientsRepository.query(query);

        if (!result || !result[0] || !result[0].name) {
          throw new Error(
            `Ingredient not found for ingredient_id: ${item.ingredient_id}`,
          );
        }

        return {
          id: item.id as ShoppingListItemId,
          name: result[0].name,
          quantity: item.quantity,
          unit: item.unit,
          completed: item.completed,
        };
      }),
    );

    return shoppingListItemDtos;
  }

  @Post('/bulk')
  async bulkAddToShoppingList(
    @Body() dto: BulkAddToShoppingListDto,
    @CurrentUser() currentUser: User,
  ): Promise<IShoppingListItemDto[]> {
    await this.shoppingListService.bulkAddToShoppingList(dto, currentUser);
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
  async bulkDeleteShoppingListItems(
    @Body() dto: BulkDeleteShoppingListItemsDto,
    @CurrentUser() currentUser: User,
  ): Promise<IShoppingListItemDto[]> {
    await this.shoppingListService.deleteShoppingListItems(
      dto.itemIds,
      currentUser,
    );
    return this.listShoppingListItems();
  }
}
