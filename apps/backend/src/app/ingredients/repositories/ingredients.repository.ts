import { DataSource, Repository } from 'typeorm';
import { Ingredient } from '../entities';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';

@Injectable()
export class IngredientsRepository {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  findMostPopular(pagination: Pagination): Promise<Ingredient[]> {
    return this.dataSource
      .createQueryBuilder()
      .from(
        (qb) =>
          qb
            .from('recipe_ingredients', 'recipe_ingredients')
            .select('recipe_ingredients.ingredient_id', 'id')
            .addSelect('Count(1)', 'usages')
            .groupBy('recipe_ingredients.ingredient_id'),
        'most_popular_ingredients',
      )
      .innerJoin(
        Ingredient,
        'ingredients',
        'ingredients.id = most_popular_ingredients.id',
      )
      .select('ingredients.id', 'id')
      .addSelect('ingredients.name', 'name')
      .orderBy('most_popular_ingredients.usages', 'DESC')
      .offset(pagination.skip)
      .limit(pagination.take)
      .getRawMany();
  }

  findByName(name: string, pagination: Pagination): Promise<Ingredient[]> {
    return this.ingredientRepository
      .createQueryBuilder()
      .skip(pagination.skip)
      .take(pagination.take)
      .orderBy('similarity(name, :name)', 'DESC')
      .setParameter('name', name)
      .getMany();
  }
}
