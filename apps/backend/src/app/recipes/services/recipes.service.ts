import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
  UserId,
} from '@lib/shared';
import { RecipesRepository } from '../repositories';
import { Pagination } from '../../utils';
import { ListRecipesQueryDto } from '../dtos';
import { UserRepository } from '../../iam/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeDetailsViewEntity } from '../entities/recipe-details.view.entity';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipesRepository: RecipesRepository,
    @InjectRepository(RecipeDetailsViewEntity)
    private readonly recipeDetailsRepository: Repository<RecipeDetailsViewEntity>,
    private readonly usersRepository: UserRepository,
  ) {}

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

  async addRecipeToFavorites(
    recipeId: RecipeId,
    userId: UserId,
  ): Promise<void> {
    const user = await this.usersRepository.findUserWithFavouriteRecipes(
      userId,
    );

    if (!user) throw new NotFoundException('User does not exist!');
    if (user.hasRecipeAddedToFavourites(recipeId))
      throw new BadRequestException('Recipe is already marked as favourite!');

    const recipe = await this.recipesRepository.find(recipeId);

    if (!recipe) throw new NotFoundException('Recipe does not exist!');

    user.addRecipeToFavourites(recipe);

    await this.usersRepository.save(user);
  }

  listFavouriteRecipes(userId: UserId): Promise<IRecipeListItemDto[]> {
    return this.recipesRepository.findAllFavourite(userId);
  }

  async removeRecipeFromFavorites(
    recipeId: RecipeId,
    userId: UserId,
  ): Promise<void> {
    await this.usersRepository.removeFavouriteRecipe(userId, recipeId);
  }
}
