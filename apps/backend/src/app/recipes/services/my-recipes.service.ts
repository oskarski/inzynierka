import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IDraftRecipeDto,
  IPublishRecipeDto,
  IRecipeListItemDto,
  RecipeId,
  UserId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';

@Injectable()
export class MyRecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async createRecipe(
    createRecipeDto: IDraftRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    return this.recipesRepository.createRecipe(createRecipeDto, userId);
  }

  async listRecipes(userId: UserId): Promise<IRecipeListItemDto[]> {
    return this.recipesRepository.findUserRecipes(userId);
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

  async unpublishRecipe(
    recipeId: RecipeId,
    unpublishRecipeDto: IDraftRecipeDto,
    userId: UserId,
  ): Promise<void> {
    const recipe = await this.recipesRepository.find(recipeId);

    if (!recipe) throw new NotFoundException('Recipe not found!');
    if (!recipe.isCreatedBy(userId))
      throw new BadRequestException('No permissions to modify the recipe!');

    await this.recipesRepository.unpublishRecipe(recipeId, unpublishRecipeDto);
  }
}
