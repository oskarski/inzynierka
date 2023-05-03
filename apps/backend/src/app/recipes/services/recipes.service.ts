import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateRecipeDto,
  IPaginated,
  IPublishRecipeDto,
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

  async createAndPublishRecipe(
    publishRecipeDto: IPublishRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    return this.recipesRepository.createAndPublishRecipe(
      publishRecipeDto,
      userId,
    );
  }

  async publishRecipe(
    recipeId: RecipeId,
    publishRecipeDto: IPublishRecipeDto,
    userId: UserId,
  ): Promise<void> {
    const recipe = await this.recipesRepository.find(recipeId);

    if (!recipe) throw new NotFoundException('Recipe not found!');
    if (!recipe.isCreatedBy(userId))
      throw new BadRequestException('No permissions to modify the recipe!');

    await this.recipesRepository.publishRecipe(recipeId, publishRecipeDto);
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
