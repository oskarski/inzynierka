import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IListRecipesQueryDto,
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { Pagination } from '../../utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeDetailsViewEntity } from '../entities';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    @InjectRepository(RecipeDetailsViewEntity)
    private readonly recipeDetailsRepository: Repository<RecipeDetailsViewEntity>,
  ) {}

  async listRecipesPaginated(
    queryDto: IListRecipesQueryDto,
  ): Promise<IPaginated<IRecipeListItemDto>> {
    const pagination = Pagination.page(queryDto.page, queryDto.perPage);

    if (queryDto.ingredients && queryDto.ingredients.length) {
      const [data, total] = await this.recipesRepository.findByFilters(
        queryDto,
        pagination,
      );

      return {
        data,
        total,
      };
    }

    const [data, total] = await this.recipesRepository.findAll(pagination);

    return {
      data,
      total,
    };
  }

  async getRecipe(id: RecipeId): Promise<IRecipeDto> {
    const recipe = await this.recipeDetailsRepository.findOneBy({ id });

    if (!recipe) throw new NotFoundException();

    return recipe;
  }
}
