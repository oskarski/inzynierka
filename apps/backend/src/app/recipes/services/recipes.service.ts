import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
  UserId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { Pagination } from '../../utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeDetailsViewEntity } from '../entities';
import { ListRecipesQueryDto } from '../dtos';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    @InjectRepository(RecipeDetailsViewEntity)
    private readonly recipeDetailsRepository: Repository<RecipeDetailsViewEntity>,
  ) {}

  async listRecipesPaginated(
    queryDto: ListRecipesQueryDto,
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

    const [data, total] = await this.recipesRepository.findAll(
      pagination,
      queryDto,
    );

    return {
      data,
      total,
    };
  }

  async getRecipe(id: RecipeId, currentUserId: UserId): Promise<IRecipeDto> {
    const recipe = await this.recipeDetailsRepository.findOneBy({
      id,
    });

    if (!recipe) throw new NotFoundException();
    if (!recipe.isPublished() && !recipe.isAuthoredBy(currentUserId))
      throw new NotFoundException();

    return recipe;
  }
}
