import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RecipeCategoryId } from '@lib/shared';

@Entity()
export class RecipeCategory {
  @PrimaryColumn('uuid')
  id: RecipeCategoryId;

  @Column()
  name: string;
}
