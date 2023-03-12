import { Injectable } from '@nestjs/common';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { RecipeCategoryRepository } from '../repositories';

@Injectable()
export class RecipeCategoriesService {
  constructor(
    private readonly recipeCategoryRepository: RecipeCategoryRepository,
  ) {}

  listAll(): Promise<IRecipeCategoryListItemDto[]> {
    return this.recipeCategoryRepository.listAll()
  }
}
