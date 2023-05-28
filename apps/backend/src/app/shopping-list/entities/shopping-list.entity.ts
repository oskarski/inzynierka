import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../iam/entities';
import { Ingredient } from '../../ingredients/entities';
import { IngredientId, UserId } from '@lib/shared';

@Entity()
export class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: UserId;

  @ManyToOne(() => User, (user) => user.shoppingLists)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  ingredient_id: IngredientId;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.shoppingLists)
  @JoinColumn({ name: 'ingredient_id' })
  foodItem: Ingredient;

  @Column('decimal')
  quantity: number;

  @Column({ length: 20 })
  unit: string;

  @Column()
  completed: boolean;
}
