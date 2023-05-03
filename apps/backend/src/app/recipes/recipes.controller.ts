import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { PrivateApiGuard } from '../auth';
import { RecipesService } from './services';
import { ListRecipesQueryDto } from './dtos';

@Controller('recipes')
@UseGuards(PrivateApiGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async listRecipesPaginated(
    @Query() queryDto: ListRecipesQueryDto,
  ): Promise<IPaginated<IRecipeListItemDto>> {
    return this.recipesService.listRecipesPaginated(queryDto);
  }

  @Get('/:id')
  async getRecipeDetails(@Param('id') id: RecipeId): Promise<IRecipeDto> {
    return this.recipesService.getRecipe(id);
  }
}
