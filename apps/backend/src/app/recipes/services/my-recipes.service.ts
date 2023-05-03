import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateRecipeDto,
  IPublishRecipeDto,
  RecipeId,
  UserId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';

@Injectable()
export class MyRecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async createRecipe(
    createRecipeDto: ICreateRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    return this.recipesRepository.createRecipe(createRecipeDto, userId);
  }

  async createAndPublishRecipe(
    publishRecipeDto: IPublishRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    return this.recipesRepository.createAndPublishRecipe(
      publishRecipeDto,
      userId,
    );
  }

  async publishRecipe(
    recipeId: RecipeId,
    publishRecipeDto: IPublishRecipeDto,
    userId: UserId,
  ): Promise<void> {
    const recipe = await this.recipesRepository.find(recipeId);

    if (!recipe) throw new NotFoundException('Recipe not found!');
    if (!recipe.isCreatedBy(userId))
      throw new BadRequestException('No permissions to modify the recipe!');

    await this.recipesRepository.publishRecipe(recipeId, publishRecipeDto);
  }
}
