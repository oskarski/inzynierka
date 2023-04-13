import { Controller, Get, UseGuards } from '@nestjs/common';
import { IPaginated, IRecipeListItemDto } from '@lib/shared';
import { PrivateApiGuard } from '../auth';
import { RecipesService } from './services';

@Controller('recipes')
@UseGuards(PrivateApiGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async findRecipesPaginated(): Promise<IPaginated<IRecipeListItemDto>> {
    return this.recipesService.findRecipes();
  }
}
