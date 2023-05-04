import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeCategoryId } from '@lib/shared';

export enum CategoryType {
  DishType = 'dish-type',
  CuisineType = 'cuisine-type',
  DietType = 'diet-type',
  Other = 'other',
}

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
