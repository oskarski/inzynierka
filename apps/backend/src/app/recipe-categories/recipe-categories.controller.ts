import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RecipeCategoriesService } from './services';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { PrivateApiGuard } from '../auth';
import { ListCategoriesQueryDto } from './dtos';

@Controller('recipe-categories')
@UseGuards(PrivateApiGuard)
export class RecipeCategoriesController {
  constructor(
    private readonly recipeCategoriesService: RecipeCategoriesService,
  ) {}

  @Get()
  async listCategories(
    @Query() queryDto: ListCategoriesQueryDto,
  ): Promise<IRecipeCategoryListItemDto[]> {
    return this.recipeCategoriesService.listCategories(queryDto);
  }
}
