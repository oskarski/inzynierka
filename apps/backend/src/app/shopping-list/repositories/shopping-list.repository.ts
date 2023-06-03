import { Repository } from 'typeorm';
import { ShoppingList } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../iam/entities';
import { UserId } from '@lib/shared';

@Injectable()
export class ShoppingListRepository {
  constructor(
    @InjectRepository(ShoppingList)
    private repository: Repository<ShoppingList>,
  ) {}

  findAll(currentUserId: UserId): Promise<ShoppingList[]> {
    return this.repository.find({ where: { user_id: currentUserId } });
  }

  findById(
    id: string,
    currentUserId: UserId,
  ): Promise<ShoppingList | undefined> {
    return this.repository.findOne({ where: { id, user_id: currentUserId } });
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
      .andWhere('user_id = :user_id', { user_id: currentUser.id })
      .getMany();

    await this.repository.remove(shoppingListsToDelete);

    // Return the updated list of shopping lists
    return this.repository.find();
  }

  save(shoppingList: ShoppingList): Promise<ShoppingList> {
    return this.repository.save(shoppingList);
  }
}
