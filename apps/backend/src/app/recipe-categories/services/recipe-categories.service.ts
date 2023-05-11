import { Injectable } from '@nestjs/common';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { RecipeCategoryRepository } from '../repositories';
import { ListCategoriesQueryDto } from '../dtos';

@Injectable()
export class RecipeCategoriesService {
  constructor(
    private readonly recipeCategoryRepository: RecipeCategoryRepository,
  ) {}

  listCategories(
    queryDto: ListCategoriesQueryDto,
  ): Promise<IRecipeCategoryListItemDto[]> {
    return this.recipeCategoryRepository.findAll(queryDto);
  }
}
