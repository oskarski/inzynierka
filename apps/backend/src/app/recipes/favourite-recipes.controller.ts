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
import { FavouriteRecipesService } from './services';
import { AddRecipeToFavouritesDto } from './dtos';
import { User } from '../iam/entities';

@Controller('favourite-recipes')
@UseGuards(PrivateApiGuard)
export class FavouriteRecipesController {
  constructor(
    private readonly favouriteRecipesService: FavouriteRecipesService,
  ) {}

  @Get()
  async listFavouriteRecipes(
    @CurrentUser() currentUser: User,
  ): Promise<IRecipeListItemDto[]> {
    return this.favouriteRecipesService.listFavouriteRecipes(currentUser.id);
  }

  @Post()
  async addRecipeToFavorites(
    @Body() dto: AddRecipeToFavouritesDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.favouriteRecipesService.addRecipeToFavorites(
      dto.recipeId,
      currentUser.id,
    );
  }

  @Delete('/:id')
  async removeRecipeFromFavorites(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.favouriteRecipesService.removeRecipeFromFavorites(
      id,
      currentUser.id,
    );
  }
}
