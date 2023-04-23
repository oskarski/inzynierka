import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { RecipeId, UserId } from '@lib/shared';
import { Recipe } from '../../recipes/entities';

export enum UserStatus {
  notConfirmed = 'not_confirmed',
  confirmed = 'confirmed',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  status: UserStatus;

  @ManyToMany(() => Recipe)
  @JoinTable({
    name: 'users_favourite_recipes',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'recipe_id',
      referencedColumnName: 'id',
    },
  })
  favouriteRecipes: Recipe[];

  @RelationId((user: User) => user.favouriteRecipes)
  favouriteRecipesIds: RecipeId[];

  static notConfirmed(id: UserId): User {
    const user = new User();

    user.id = id;
    user.status = UserStatus.notConfirmed;

    return user;
  }

  isConfirmed(): boolean {
    return this.status === UserStatus.confirmed;
  }

  hasRecipeAddedToFavourites(recipeId: RecipeId): boolean {
    return this.favouriteRecipesIds.includes(recipeId);
  }

  addRecipeToFavourites(recipe: Recipe): void {
    this.favouriteRecipes.push(recipe);
  }
}
