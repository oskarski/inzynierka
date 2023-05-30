import { Injectable } from '@nestjs/common';
import { IShoppingListItemDto } from '@lib/shared';
import { ShoppingListRepository } from '../repositories';
import { User } from '../../iam/entities';
import { ShoppingList } from '../entities';
import { BulkAddToShoppingListDto } from '../dtos';

@Injectable()
export class ShoppingListService {
  constructor(
    private readonly shoppingListRepository: ShoppingListRepository,
  ) {}

  async listShoppingListItems(): Promise<ShoppingList[]> {
    // Call the repository method to retrieve the list of shopping list items
    return this.shoppingListRepository.findAll();
  }

  async bulkAddToShoppingList(
    dto: BulkAddToShoppingListDto,
    currentUser: User,
  ): Promise<void> {
    const existingItems: ShoppingList[] =
      await this.shoppingListRepository.findAll();

    const groupedItems: { [key: string]: ShoppingList } = {};

    for (const item of dto.items) {
      const key = `${item.ingredientId}-${item.unit}`;

      if (groupedItems[key]) {
        // If an item with the same ingredient and unit already exists, sum the quantity
        groupedItems[key].quantity += item.quantity;
      } else {
        // Check if an existing item with the same ingredient and unit exists
        const existingItem = existingItems.find(
          (i) => i.ingredient_id === item.ingredientId && i.unit === item.unit,
        );

        if (existingItem) {
          // If an existing item exists, update its quantity
          existingItem.quantity += item.quantity;
          groupedItems[key] = existingItem;
        } else {
          // Create a new ShoppingList instance
          const shoppingListItem = new ShoppingList();
          shoppingListItem.user = currentUser;
          shoppingListItem.ingredient_id = item.ingredientId;
          shoppingListItem.quantity = item.quantity;
          shoppingListItem.unit = item.unit;
          shoppingListItem.completed = false;

          // Add the item to the groupedItems object
          groupedItems[key] = shoppingListItem;
        }
      }
    }

    // Convert the groupedItems object into an array of ShoppingList instances
    const shoppingListItems = Object.values(groupedItems);

    // Save the new shopping list items to the repository
    await this.shoppingListRepository.createBulk(shoppingListItems);
  }

  async deleteShoppingListItems(
    itemIds: string[],
    currentUser: User,
  ): Promise<void> {
    // Perform the deletion logic using the provided itemIds and currentUser
    await this.shoppingListRepository.delete(itemIds, currentUser);
  }
}
