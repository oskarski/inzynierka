import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IPaginated, IRecipeListItemDto } from '@lib/shared';
import { PrivateApiGuard } from '../auth';
import { RecipesService } from './services';
import { ListRecipesQueryDto } from './dtos';

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
}
