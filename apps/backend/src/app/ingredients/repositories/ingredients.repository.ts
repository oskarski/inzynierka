import { Repository } from 'typeorm';
import { Ingredient } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';

@Injectable()
export class IngredientsRepository {
  constructor(
    @InjectRepository(Ingredient)
    private repository: Repository<Ingredient>,
  ) {}

  findAll(pagination: Pagination): Promise<Ingredient[]> {
    return this.repository
      .createQueryBuilder()
      .skip(pagination.skip)
      .take(pagination.take)
      .getMany();
  }

  findByName(name: string, pagination: Pagination): Promise<Ingredient[]> {
    return this.repository
      .createQueryBuilder()
      .skip(pagination.skip)
      .take(pagination.take)
      .where('name LIKE :name', { name: `${name}%` })
      .orderBy('name')
      .getMany();
  }
}
