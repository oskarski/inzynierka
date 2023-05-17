import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IRecipeListItemDto, RecipeId } from '@lib/shared';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { MyRecipesService } from './services';
import { CreateRecipeDto, PublishRecipeDto, UnpublishRecipeDto } from './dtos';
import { User } from '../iam/entities';

@Controller('me/recipes')
@UseGuards(PrivateApiGuard)
export class MyRecipesController {
  constructor(private readonly myRecipesService: MyRecipesService) {}

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<RecipeId> {
    return this.myRecipesService.createRecipe(createRecipeDto, currentUser.id);
  }

  @Post('/publish')
  async createAndPublishRecipe(
    @Body() publishRecipeDto: PublishRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<RecipeId> {
    return this.myRecipesService.createAndPublishRecipe(
      publishRecipeDto,
      currentUser.id,
    );
  }

  @Get()
  async listRecipes(
    @CurrentUser() currentUser: User,
  ): Promise<IRecipeListItemDto[]> {
    return this.myRecipesService.listRecipes(currentUser.id);
  }

  @Post('/:id/publish')
  async publishRecipe(
    @Param('id') recipeId: RecipeId,
    @Body() publishRecipeDto: PublishRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.myRecipesService.publishRecipe(
      recipeId,
      publishRecipeDto,
      currentUser.id,
    );
  }

  @Delete('/:id/publish')
  async unpublishRecipe(
    @Param('id') recipeId: RecipeId,
    @Body() unpublishRecipeDto: UnpublishRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.myRecipesService.unpublishRecipe(
      recipeId,
      unpublishRecipeDto,
      currentUser.id,
    );
  }
}
