import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredientId } from '@lib/shared';
import { ShoppingList } from '../../shopping-list/entities';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: IngredientId;

  @Column()
  name: string;

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.foodItem)
  shoppingLists: ShoppingList[];
}
