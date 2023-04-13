import { Repository } from 'typeorm';
import { Recipe } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';

@Injectable()
export class RecipesRepository {
  constructor(
    @InjectRepository(Recipe)
    private repository: Repository<Recipe>,
  ) {}

  findAll(pagination: Pagination): Promise<[Recipe[], number]> {
    return this.repository
      .createQueryBuilder()
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
  }
}
