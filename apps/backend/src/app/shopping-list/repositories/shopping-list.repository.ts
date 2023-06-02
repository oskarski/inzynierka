import { Repository } from 'typeorm';
import { ShoppingList } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../iam/entities';

@Injectable()
export class ShoppingListRepository {
  constructor(
    @InjectRepository(ShoppingList)
    private repository: Repository<ShoppingList>,
  ) {}

  findAll(): Promise<ShoppingList[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<ShoppingList | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  create(shoppingList: ShoppingList): Promise<ShoppingList> {
    return this.repository.save(shoppingList);
  }

  createBulk(shoppingListItems: ShoppingList[]): Promise<ShoppingList[]> {
    return this.repository.save(shoppingListItems);
  }

  update(shoppingList: ShoppingList): Promise<ShoppingList> {
    return this.repository.save(shoppingList);
  }

  async delete(itemIds: string[], currentUser: User): Promise<ShoppingList[]> {
    // Find the shopping lists to be deleted
    const shoppingListsToDelete = await this.repository
      .createQueryBuilder('shoppingList')
      .whereInIds(itemIds)
      .getMany();

    // Update the user and delete the shopping lists
    shoppingListsToDelete.forEach((shoppingList) => {
      shoppingList.user = currentUser;
    });
    await this.repository.remove(shoppingListsToDelete);

    // Return the updated list of shopping lists
    return this.repository.find();
  }

  save(shoppingList: ShoppingList): Promise<ShoppingList> {
    return this.repository.save(shoppingList);
  }
}
