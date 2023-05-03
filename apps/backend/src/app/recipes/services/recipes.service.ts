import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICreateRecipeDto,
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
  UserId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { Pagination } from '../../utils';
import { ListRecipesQueryDto } from '../dtos';
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

  async createRecipe(
    createRecipeDto: ICreateRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    return this.recipesRepository.createRecipe(createRecipeDto, userId);
  }

  async listRecipesPaginated(
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
    const recipe = await this.recipeDetailsRepository.findOneBy({ id });

    if (!recipe) throw new NotFoundException();

    return recipe;
  }
}
