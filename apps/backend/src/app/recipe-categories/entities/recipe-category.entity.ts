import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryType, RecipeCategoryId } from '@lib/shared';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: RecipeCategoryId;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
    default: CategoryType.Other,
  })
  type: CategoryType;
}
