import { Injectable } from '@nestjs/common';
import { IPaginated, IRecipeListItemDto } from '@lib/shared';
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
}
