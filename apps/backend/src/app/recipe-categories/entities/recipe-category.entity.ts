import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeCategoryId } from '@lib/shared';

@Entity()
export class RecipeCategory {
  @PrimaryGeneratedColumn('uuid')
  id: RecipeCategoryId;

  @Column()
  name: string;
}
