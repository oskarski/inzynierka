import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../iam/entities';
import { Ingredient } from '../../ingredients/entities';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.shoppingLists)
  user: User;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.shoppingLists)
  foodItem: Ingredient;

  @Column('decimal')
  quantity: number;

  @Column({ length: 20 })
  unit: string;

  @Column()
  completed: boolean;
}
