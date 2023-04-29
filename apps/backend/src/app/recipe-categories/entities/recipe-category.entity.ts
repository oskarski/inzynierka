import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeCategoryId } from '@lib/shared';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: RecipeCategoryId;

  @Column()
  name: string;
}
