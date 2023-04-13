import { Injectable } from '@nestjs/common';
import { IPaginated, IRecipeListItemDto } from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { Pagination } from '../../utils';

@Injectable()
export class RecipesService {
  constructor(private readonly recipesRepository: RecipesRepository) {}

  async findRecipes(): Promise<IPaginated<IRecipeListItemDto>> {
    const [data, total] = await this.recipesRepository.findAll(
      Pagination.firstPage(5),
    );

    return {
      data,
      total,
    };
  }
}
