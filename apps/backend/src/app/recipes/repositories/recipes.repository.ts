import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Recipe, RecipeCategory, RecipeIngredient } from '../entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';
import {
  ICreateRecipeDto,
  IPublishRecipeDto,
  ISaveRecipeIngredientDto,
  RecipeCategoryId,
  RecipeId,
  RecipeState,
  UserId,
} from '@lib/shared';
import { ListRecipesQueryDto } from '../dtos';

interface FindAllSelect {
  id: RecipeId;
  name: string;
  description: string;
  preparationTime: number;
  portions: number;
  categoryIds: RecipeCategoryId[];
}

class SaveRecipeTransactionQuery {
  constructor(private readonly queryRunner: QueryRunner) {}

  static async fromQueryRunner(
    queryRunner: QueryRunner,
  ): Promise<SaveRecipeTransactionQuery> {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    return new SaveRecipeTransactionQuery(queryRunner);
  }

  async createDraftRecipe(
    dto: ICreateRecipeDto,
    authorId: UserId,
  ): Promise<RecipeId> {
    return this.createRecipe(
      {
        ...dto,
        name: dto.name,
        description: dto.description || '',
        preparationTime: dto.preparationTime || 0,
        portions: dto.portions || 0,
        instructions: dto.instructions || [],
      },
      authorId,
      RecipeState.draft,
    );
  }

  async createPublishedRecipe(
    dto: IPublishRecipeDto,
    authorId: UserId,
  ): Promise<RecipeId> {
    return this.createRecipe(dto, authorId, RecipeState.published);
  }

  private async createRecipe(
    dto: ICreateRecipeDto,
    authorId: UserId,
    state: RecipeState,
  ): Promise<RecipeId> {
    const createdRecipe = await this.queryRunner.manager.save(Recipe, {
      name: dto.name,
      description: dto.description,
      preparationTime: dto.preparationTime,
      portions: dto.portions,
      instructions: dto.instructions,
      authorId,
      state,
    });

    return createdRecipe.id;
  }

  async publishRecipe(
    recipeId: RecipeId,
    dto: IPublishRecipeDto,
  ): Promise<void> {
    await this.queryRunner.manager.save(Recipe, {
      recipeId,
      name: dto.name,
      description: dto.description,
      preparationTime: dto.preparationTime,
      portions: dto.portions,
      instructions: dto.instructions,
      state: RecipeState.published,
    });
  }

  async saveCategories(
    recipeId: RecipeId,
    categoryIds: RecipeCategoryId[] | undefined,
  ): Promise<void> {
    if (!categoryIds || !categoryIds.length) return;

    await this.queryRunner.manager.save(
      RecipeCategory,
      categoryIds.map((categoryId) => ({
        recipeId,
        categoryId,
      })),
    );
  }

  async saveIngredients(
    recipeId: RecipeId,
    ingredients: ISaveRecipeIngredientDto[] | undefined,
  ): Promise<void> {
    if (!ingredients || !ingredients.length) return;

    await this.queryRunner.manager.save(
      RecipeIngredient,
      ingredients.map((ingredient) => ({
        recipeId,
        ingredientId: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
    );
  }

  async execute(): Promise<void> {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
  }
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
    const query = await SaveRecipeTransactionQuery.fromQueryRunner(
      this.dataSource.createQueryRunner(),
    );

    try {
      const createdRecipeId = await query.createDraftRecipe(dto, userId);

      await query.saveCategories(createdRecipeId, dto.categoryIds);
      await query.saveIngredients(createdRecipeId, dto.ingredients);
      await query.execute();

      return createdRecipeId;
    } catch (err) {
      console.error(err);
      await query.rollback();

      throw new BadRequestException();
    }
  }

  async createAndPublishRecipe(
    dto: IPublishRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    const query = await SaveRecipeTransactionQuery.fromQueryRunner(
      this.dataSource.createQueryRunner(),
    );

    try {
      const createdRecipeId = await query.createPublishedRecipe(dto, userId);

      await query.saveCategories(createdRecipeId, dto.categoryIds);
      await query.saveIngredients(createdRecipeId, dto.ingredients);
      await query.execute();

      return createdRecipeId;
    } catch (err) {
      console.error(err);
      await query.rollback();

      throw new BadRequestException();
    }
  }

  async publishRecipe(
    recipeId: RecipeId,
    dto: IPublishRecipeDto,
  ): Promise<void> {
    const query = await SaveRecipeTransactionQuery.fromQueryRunner(
      this.dataSource.createQueryRunner(),
    );

    try {
      await query.publishRecipe(recipeId, dto);
      await query.saveCategories(recipeId, dto.categoryIds);
      await query.saveIngredients(recipeId, dto.ingredients);
      await query.execute();
    } catch (err) {
      console.error(err);
      await query.rollback();

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

  async findByFilters(
    queryDto: ListRecipesQueryDto,
    pagination: Pagination,
  ): Promise<[FindAllSelect[], number]> {
    const ingredientIds = queryDto.ingredients.map(
      (ingredient) => ingredient.id,
    );

    const query = this.repository
      .createQueryBuilder('recipes')
      .select('matching_recipes.ingredients_coverage', 'ingredientsCoverage')
      .addSelect('matching_recipes.category_ids', 'categoryIds')
      .addSelect('recipes.id', 'id')
      .addSelect('recipes.name', 'name')
      .addSelect('recipes.description', 'description')
      .addSelect('recipes.portions', 'portions')
      .addSelect('recipes.preparation_time', 'preparationTime')
      .innerJoin(
        (subQuery) =>
          subQuery
            .select('ri.recipe_id', 'recipe_id')
            .addSelect(
              'max(matching_ingredients.count)::float / count(DISTINCT ri.ingredient_id)',
              'ingredients_coverage',
            )
            .addSelect(
              'array_remove(array_agg(DISTINCT rc.category_id), NULL)',
              'category_ids',
            )
            .from(RecipeIngredient, 'ri')
            .innerJoin(
              (subSubQuery) =>
                subSubQuery
                  .select('mi_ri.recipe_id', 'recipe_id')
                  .addSelect('count(1)', 'count')
                  .from(RecipeIngredient, 'mi_ri')
                  .where('ingredient_id IN (:...ingredientIds)', {
                    ingredientIds,
                  })
                  .groupBy('mi_ri.recipe_id'),
              'matching_ingredients',
              'ri.recipe_id = matching_ingredients.recipe_id',
            )
            .leftJoin(RecipeCategory, 'rc', 'ri.recipe_id = rc.recipe_id')
            .groupBy('ri.recipe_id'),
        'matching_recipes',
        'recipes.id = matching_recipes.recipe_id',
      )
      .orderBy('matching_recipes.ingredients_coverage', 'DESC')
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
