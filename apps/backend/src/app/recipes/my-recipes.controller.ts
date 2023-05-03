import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { RecipeId } from '@lib/shared';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { RecipesService } from './services';
import { CreateRecipeDto, PublishRecipeDto } from './dtos';
import { User } from '../iam/entities';

@Controller('me/recipes')
@UseGuards(PrivateApiGuard)
export class MyRecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<RecipeId> {
    return this.recipesService.createRecipe(createRecipeDto, currentUser.id);
  }

  @Post('/publish')
  async createAndPublishRecipe(
    @Body() publishRecipeDto: PublishRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<RecipeId> {
    return this.recipesService.createAndPublishRecipe(
      publishRecipeDto,
      currentUser.id,
    );
  }

  @Post('/:id/publish')
  async publishRecipe(
    @Param('id') recipeId: RecipeId,
    @Body() publishRecipeDto: PublishRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.recipesService.publishRecipe(
      recipeId,
      publishRecipeDto,
      currentUser.id,
    );
  }
}
