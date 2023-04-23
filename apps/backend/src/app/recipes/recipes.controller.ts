import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { RecipesService } from './services';
import { ListRecipesQueryDto } from './dtos';
import { User } from '../iam/entities';

@Controller('recipes')
@UseGuards(PrivateApiGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findRecipesPaginated(
    @Query() queryDto: ListRecipesQueryDto,
  ): Promise<IPaginated<IRecipeListItemDto>> {
    return this.recipesService.findRecipes(queryDto);
  }

  @Get('/:id')
  async getRecipeDetails(@Param('id') id: RecipeId): Promise<IRecipeDto> {
    return this.recipesService.getRecipe(id);
  }

  @Post('/:id/favourite')
  async addRecipeToFavorites(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.recipesService.addRecipeToFavorites(id, currentUser.id);
  }
}
