import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecipeCategoriesService } from './services';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { PrivateApiGuard } from '../auth';

@Controller('recipe-categories')
@UseGuards(PrivateApiGuard)
export class RecipeCategoriesController {
  constructor(
    private readonly recipeCategoriesService: RecipeCategoriesService,
  ) {}

  @Get()
  async listCategories(): Promise<IRecipeCategoryListItemDto[]> {
    return this.recipeCategoriesService.listCategories();
  }
}
