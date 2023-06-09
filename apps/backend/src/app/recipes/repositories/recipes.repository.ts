import {
  DataSource,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import {
  Recipe,
  RecipeCategory,
  RecipeIngredient,
  RecipeListItemViewEntity,
} from '../entities';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';
import {
  ISaveDraftRecipeDto,
  IListRecipesCategoryFiltersDto,
  IListRecipesDifficultyFiltersDto,
  IListRecipesFiltersDto,
  IListRecipesPreparationTimeFiltersDto,
  IListRecipesQueryDto,
  IPublishRecipeDto,
  ISaveRecipeIngredientDto,
  RecipeCategoryId,
  RecipeId,
  RecipeState,
  UserId,
  RecipeDifficulty,
  IListRecipesReviewFiltersDto,
} from '@lib/shared';
import { uniq } from 'lodash';

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
    dto: ISaveDraftRecipeDto,
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
    dto: ISaveDraftRecipeDto,
    authorId: UserId,
    state: RecipeState,
  ): Promise<RecipeId> {
    const createdRecipe = await this.queryRunner.manager.save(Recipe, {
      name: dto.name,
      description: dto.description,
      difficulty: dto.difficulty,
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
      id: recipeId,
      name: dto.name,
      description: dto.description,
      preparationTime: dto.preparationTime,
      portions: dto.portions,
      instructions: dto.instructions,
      state: RecipeState.published,
    });
  }

  async unpublishRecipe(
    recipeId: RecipeId,
    dto: ISaveDraftRecipeDto,
  ): Promise<void> {
    await this.queryRunner.manager.save(Recipe, {
      id: recipeId,
      name: dto.name,
      description: dto.description,
      preparationTime: dto.preparationTime,
      portions: dto.portions,
      instructions: dto.instructions,
      state: RecipeState.draft,
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

interface ListRecipesQueryResult {
  id: RecipeId;
  name: string;
  description: string;
  preparationTime: number;
  portions: number;
  categoryIds: RecipeCategoryId[];
  state: RecipeState;
  authorId: UserId;
  difficulty: RecipeDifficulty;
  review: number | null;
  coverImage: string | null;
}

class ListRecipesQuery {
  constructor(
    private readonly queryBuilder: SelectQueryBuilder<RecipeListItemViewEntity>,
  ) {
    this.queryBuilder
      .select([
        'recipe.id AS id',
        'recipe.name AS name',
        'recipe.description AS description',
        'recipe.portions AS portions',
        'recipe.state AS state',
        'recipe.difficulty AS difficulty',
        'recipe.review AS review',
      ])
      .addSelect('recipe.preparationTime', 'preparationTime')
      .addSelect('recipe.authorId', 'authorId')
      .addSelect('recipe.categoryIds', 'categoryIds')
      .addSelect('recipe.coverImage', 'coverImage');
  }

  favourite(userId: UserId): this {
    this.queryBuilder
      .innerJoin(
        'users_favourite_recipes',
        'ufr',
        'ufr.recipe_id = recipe.id AND ufr.user_id = :userId',
        { userId },
      )
      .andWhere('recipe.authorId IS NULL OR recipe.authorId = :userId', {
        userId,
      });

    return this;
  }

  createdBy(userId: UserId): this {
    this.queryBuilder.andWhere('recipe.authorId = :userId', { userId });

    return this;
  }

  published(): this {
    this.queryBuilder.andWhere('state = :state', {
      state: RecipeState.published,
    });

    return this;
  }

  filterByPreparationTime(
    filters: IListRecipesPreparationTimeFiltersDto,
  ): this {
    if (filters.maxPreparationTime)
      this.queryBuilder.andWhere(
        'recipe.preparationTime <= :maxPreparationTime',
        {
          maxPreparationTime: filters.maxPreparationTime,
        },
      );
    if (filters.minPreparationTime)
      this.queryBuilder.andWhere(
        'recipe.preparationTime >= :minPreparationTime',
        {
          minPreparationTime: filters.minPreparationTime,
        },
      );

    return this;
  }

  filterByReview(filters: IListRecipesReviewFiltersDto): this {
    if (filters.minReview)
      this.queryBuilder
        .andWhere('recipe.review IS NOT NULL')
        .andWhere('recipe.review >= :minReview', {
          minReview: filters.minReview,
        });

    return this;
  }

  filterByDishType(filters: IListRecipesCategoryFiltersDto): this {
    if (filters.dishTypeCategoryIds)
      this.queryBuilder.andWhere(
        'recipe.categoryIds && ARRAY[:...dishTypeCategoryIds]::uuid[]',
        { dishTypeCategoryIds: filters.dishTypeCategoryIds },
      );

    return this;
  }

  filterByCuisineType(filters: IListRecipesCategoryFiltersDto): this {
    if (filters.cuisineTypeCategoryIds)
      this.queryBuilder.andWhere(
        'recipe.categoryIds && ARRAY[:...cuisineTypeCategoryIds]::uuid[]',
        { cuisineTypeCategoryIds: filters.cuisineTypeCategoryIds },
      );

    return this;
  }

  filterByDietType(filters: IListRecipesCategoryFiltersDto): this {
    if (filters.dietTypeCategoryIds)
      this.queryBuilder.andWhere(
        'recipe.categoryIds && ARRAY[:...dietTypeCategoryIds]::uuid[]',
        { dietTypeCategoryIds: filters.dietTypeCategoryIds },
      );

    return this;
  }

  filterByOtherCategories(filters: IListRecipesCategoryFiltersDto): this {
    if (filters.otherCategoryIds)
      this.queryBuilder.andWhere(
        'recipe.categoryIds && ARRAY[:...otherCategoryIds]::uuid[]',
        { otherCategoryIds: filters.otherCategoryIds },
      );

    return this;
  }

  filterByDifficulty(filters: IListRecipesDifficultyFiltersDto): this {
    if (filters.difficulty)
      this.queryBuilder.andWhere('difficulty IN (:...difficulty)', {
        difficulty: filters.difficulty,
      });

    return this;
  }

  paginate(pagination: Pagination): this {
    this.queryBuilder.offset(pagination.skip).limit(pagination.take);

    return this;
  }

  async getRawManyAndCount(): Promise<[ListRecipesQueryResult[], number]> {
    const recipes = await this.queryBuilder.getRawMany();
    const count = await this.queryBuilder.getCount();

    return [recipes, count];
  }

  getRawMany(): Promise<ListRecipesQueryResult[]> {
    return this.queryBuilder.getRawMany();
  }

  orderByPopularityAndGetRawMany(): Promise<ListRecipesQueryResult[]> {
    return this.queryBuilder
      .addSelect('count * COALESCE(recipe.review, 1)', 'popularity')
      .leftJoin(
        (subQuery) =>
          subQuery
            .select('ufr.recipe_id', 'recipe_id')
            .addSelect('Count(1)', 'count')
            .from('users_favourite_recipes', 'ufr')
            .groupBy('ufr.recipe_id'),
        'fr',
        'fr.recipe_id = recipe.id',
      )
      .andWhere('(recipe.review >= 3.5 OR recipe.review IS NULL)')
      .orderBy('popularity', 'DESC', 'NULLS LAST')
      .getRawMany();
  }
}

@Injectable()
export class RecipesRepository {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>,
    @InjectRepository(RecipeListItemViewEntity)
    private readonly recipeListItemRepository: Repository<RecipeListItemViewEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createRecipe(
    dto: ISaveDraftRecipeDto,
    userId: UserId,
  ): Promise<RecipeId> {
    const query = await SaveRecipeTransactionQuery.fromQueryRunner(
      this.dataSource.createQueryRunner(),
    );

    try {
      const createdRecipeId = await query.createDraftRecipe(dto, userId);

      await query.saveCategories(createdRecipeId, [
        ...(dto.dietType || []),
        ...(dto.dishType || []),
        ...(dto.cuisineType || []),
      ]);
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

      await query.saveCategories(
        createdRecipeId,
        uniq([
          ...(dto.dietType || []),
          ...(dto.dishType || []),
          ...(dto.cuisineType || []),
        ]),
      );
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
      await query.saveCategories(
        recipeId,
        uniq([
          ...(dto.dietType || []),
          ...(dto.dishType || []),
          ...(dto.cuisineType || []),
        ]),
      );
      await query.saveIngredients(recipeId, dto.ingredients);
      await query.execute();
    } catch (err) {
      console.error(err);
      await query.rollback();

      throw new BadRequestException();
    }
  }

  async unpublishRecipe(
    recipeId: RecipeId,
    dto: ISaveDraftRecipeDto,
  ): Promise<void> {
    const query = await SaveRecipeTransactionQuery.fromQueryRunner(
      this.dataSource.createQueryRunner(),
    );

    try {
      await query.unpublishRecipe(recipeId, dto);
      await query.saveCategories(
        recipeId,
        uniq([
          ...(dto.dietType || []),
          ...(dto.dishType || []),
          ...(dto.cuisineType || []),
        ]),
      );
      await query.saveIngredients(recipeId, dto.ingredients);
      await query.execute();
    } catch (err) {
      console.error(err);
      await query.rollback();

      throw new BadRequestException();
    }
  }

  async deleteRecipe(recipeId: RecipeId): Promise<void> {
    await this.repository.delete({ id: recipeId });
  }

  async findAll(
    pagination: Pagination,
    filters: IListRecipesFiltersDto,
  ): Promise<[ListRecipesQueryResult[], number]> {
    return new ListRecipesQuery(
      this.recipeListItemRepository.createQueryBuilder('recipe'),
    )
      .paginate(pagination)
      .published()
      .filterByPreparationTime(filters)
      .filterByReview(filters)
      .filterByDishType(filters)
      .filterByCuisineType(filters)
      .filterByDietType(filters)
      .filterByOtherCategories(filters)
      .filterByDifficulty(filters)
      .getRawManyAndCount();
  }

  async findByFilters(
    queryDto: IListRecipesQueryDto,
    pagination: Pagination,
  ): Promise<[ListRecipesQueryResult[], number]> {
    const ingredientIds = queryDto?.ingredients.map(
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
      .addSelect('recipes.state', 'state')
      .addSelect('recipes.difficulty', 'difficulty')
      .addSelect('recipes.review', 'review')
      .addSelect('recipes.author_id', 'authorId')
      .addSelect('recipes.cover_image', 'coverImage')
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
      .where('recipes.state = :state', { state: RecipeState.published })
      .orderBy('matching_recipes.ingredients_coverage', 'DESC')
      .offset(pagination.skip)
      .limit(pagination.take);

    if (queryDto.maxPreparationTime)
      query.andWhere('recipes.preparation_time <= :maxPreparationTime', {
        maxPreparationTime: queryDto.maxPreparationTime,
      });
    if (queryDto.minReview)
      query
        .andWhere('recipes.review IS NOT NULL')
        .andWhere('recipes.review >= :minReview', {
          minReview: queryDto.minReview,
        });
    if (queryDto.minPreparationTime)
      query.andWhere('recipes.preparation_time >= :minPreparationTime', {
        minPreparationTime: queryDto.minPreparationTime,
      });
    if (queryDto.dishTypeCategoryIds)
      query.andWhere(
        'matching_recipes.category_ids && ARRAY[:...dishTypeCategoryIds]::uuid[]',
        { dishTypeCategoryIds: queryDto.dishTypeCategoryIds },
      );
    if (queryDto.cuisineTypeCategoryIds)
      query.andWhere(
        'matching_recipes.category_ids && ARRAY[:...cuisineTypeCategoryIds]::uuid[]',
        { cuisineTypeCategoryIds: queryDto.cuisineTypeCategoryIds },
      );
    if (queryDto.dietTypeCategoryIds)
      query.andWhere(
        'matching_recipes.category_ids && ARRAY[:...dietTypeCategoryIds]::uuid[]',
        { dietTypeCategoryIds: queryDto.dietTypeCategoryIds },
      );
    if (queryDto.otherCategoryIds)
      query.andWhere(
        'matching_recipes.category_ids && ARRAY[:...otherCategoryIds]::uuid[]',
        { otherCategoryIds: queryDto.otherCategoryIds },
      );
    if (queryDto.difficulty)
      query.andWhere('recipes.difficulty IN (:...difficulty)', {
        difficulty: queryDto.difficulty,
      });

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

  findAllFavourite(userId: UserId): Promise<ListRecipesQueryResult[]> {
    return new ListRecipesQuery(
      this.recipeListItemRepository.createQueryBuilder('recipe'),
    )
      .favourite(userId)
      .getRawMany();
  }

  findUserRecipes(userId: UserId): Promise<ListRecipesQueryResult[]> {
    return new ListRecipesQuery(
      this.recipeListItemRepository.createQueryBuilder('recipe'),
    )
      .createdBy(userId)
      .getRawMany();
  }

  findPopularRecipes(
    pagination: Pagination,
  ): Promise<ListRecipesQueryResult[]> {
    return new ListRecipesQuery(
      this.recipeListItemRepository.createQueryBuilder('recipe'),
    )
      .published()
      .paginate(pagination)
      .orderByPopularityAndGetRawMany();
  }
}
