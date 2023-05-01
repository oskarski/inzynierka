import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { RecipesService } from './services';
import { CreateRecipeDto, ListRecipesQueryDto } from './dtos';
import { User } from '../iam/entities';

@Controller('recipes')
@UseGuards(PrivateApiGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() currentUser: User,
  ): Promise<RecipeId> {
    return this.recipesService.createRecipe(createRecipeDto, currentUser.id);
  }

  @Get()
  async listRecipesPaginated(
    @Query() queryDto: ListRecipesQueryDto,
  ): Promise<IPaginated<IRecipeListItemDto>> {
    return this.recipesService.listRecipesPaginated(queryDto);
  }

  @Get('/favourite')
  async listFavouriteRecipes(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<IRecipeListItemDto[]> {
    return this.recipesService.listFavouriteRecipes(currentUser.id);
  }

  // TODO Perhaps move `:id` to dto
  @Post('/favourite/:id')
  async addRecipeToFavorites(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.recipesService.addRecipeToFavorites(id, currentUser.id);
  }

  // TODO Perhaps move `:id` to dto
  @Delete('/favourite/:id')
  async removeRecipeFromFavorites(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    await this.recipesService.removeRecipeFromFavorites(id, currentUser.id);
  }

  @Get('/:id')
  async getRecipeDetails(@Param('id') id: RecipeId): Promise<IRecipeDto> {
    return this.recipesService.getRecipe(id);
  }
}
