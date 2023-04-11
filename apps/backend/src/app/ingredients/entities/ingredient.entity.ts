import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IngredientId } from '@lib/shared';

@Entity('ingredients')
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: IngredientId;

  @Column()
  name: string;
}
