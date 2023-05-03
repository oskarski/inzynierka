import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IRecipeListItemDto, RecipeId, UserId } from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { UserRepository } from '../../iam/repositories';

@Injectable()
export class FavouriteRecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async addRecipeToFavorites(
    recipeId: RecipeId,
    userId: UserId,
  ): Promise<void> {
    const user = await this.usersRepository.findUserWithFavouriteRecipes(
      userId,
    );

    if (!user) throw new NotFoundException('User does not exist!');
    if (user.hasRecipeAddedToFavourites(recipeId))
      throw new BadRequestException('Recipe is already marked as favourite!');

    const recipe = await this.recipesRepository.find(recipeId);

    if (!recipe) throw new NotFoundException('Recipe does not exist!');

    user.addRecipeToFavourites(recipe);

    await this.usersRepository.save(user);
  }

  listFavouriteRecipes(userId: UserId): Promise<IRecipeListItemDto[]> {
    return this.recipesRepository.findAllFavourite(userId);
  }

  async removeRecipeFromFavorites(
    recipeId: RecipeId,
    userId: UserId,
  ): Promise<void> {
    await this.usersRepository.removeFavouriteRecipe(userId, recipeId);
  }
}
