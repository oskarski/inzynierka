import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { Pagination } from '../../utils';
import { ListRecipesQueryDto } from '../dtos';

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async findRecipes(
    queryDto: ListRecipesQueryDto,
  ): Promise<IPaginated<IRecipeListItemDto>> {
    const [data, total] = await this.recipesRepository.findAll(
      Pagination.page(queryDto.page, queryDto.perPage),
    );

    return {
      data,
      total,
    };
  }

  async getRecipe(id: RecipeId): Promise<IRecipeDto> {
    const recipe = await this.recipesRepository.find(id);

    if (!recipe) throw new NotFoundException();

    return recipe;
  }
}
