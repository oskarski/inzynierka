import { DataSource, Repository } from 'typeorm';
import { Recipe, RecipeCategory, RecipeIngredient } from '../entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';
import {
  ICreateRecipeDto,
  RecipeCategoryId,
  RecipeId,
  UserId,
} from '@lib/shared';

interface FindAllSelect {
  id: RecipeId;
  name: string;
  description: string;
  preparationTime: number;
  portions: number;
  categoryIds: RecipeCategoryId[];
}

@Injectable()
export class RecipesRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createRecipe(dto: ICreateRecipeDto, userId: UserId): Promise<RecipeId> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdRecipe = await queryRunner.manager.save(Recipe, {
        name: dto.name,
        description: dto.description,
        preparationTime: dto.preparationTime,
        portions: dto.portions,
        instructions: dto.instructions,
        authorId: userId,
      });

      if (dto.categoryIds.length)
        await queryRunner.manager.save(
          RecipeCategory,
          dto.categoryIds.map((categoryId) => ({
            recipeId: createdRecipe.id,
            categoryId,
          })),
        );

      await queryRunner.manager.save(
        RecipeIngredient,
        dto.ingredients.map((ingredient) => ({
          recipeId: createdRecipe.id,
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })),
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return createdRecipe.id;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      throw new BadRequestException();
    }
  }

  private listRecipesQuery() {
    return this.repository
      .createQueryBuilder('recipes')
      .select([
        'recipes.id id',
        'recipes.name name',
        'recipes.description description',
        'recipes.portions portions',
      ])
      .addSelect('recipes.preparation_time', 'preparationTime')
      .addSelect('array_agg(category.category_id)', 'categoryIds')
      .leftJoin('recipes.categories', 'category')
      .groupBy('recipes.id')
      .orderBy('recipes.id');
  }

  async findAll(pagination: Pagination): Promise<[FindAllSelect[], number]> {
    const query = this.listRecipesQuery()
      .offset(pagination.skip)
      .limit(pagination.take);

    const recipes = await query.getRawMany();
    const count = await query.getCount();

    return [recipes, count];
  }

  find(id: RecipeId): Promise<Recipe | null> {
    return this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  findAllFavourite(userId: UserId): Promise<FindAllSelect[]> {
    return this.listRecipesQuery()
      .innerJoin('users_favourite_recipes', 'ufr', 'ufr.recipe_id = recipes.id')
      .where('ufr.user_id = :userId', { userId })
      .getRawMany();
  }
}
