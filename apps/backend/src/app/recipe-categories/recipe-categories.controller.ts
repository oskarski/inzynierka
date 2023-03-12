import { Controller, Get } from '@nestjs/common';
import { RecipeCategoriesService } from './services';
import { IRecipeCategoryListItemDto } from '@lib/shared';

@Controller('recipe-categories')
export class RecipeCategoriesController {
  constructor(
    private readonly recipeCategoriesService: RecipeCategoriesService,
  ) {}

  @Get()
  async listAll(): Promise<IRecipeCategoryListItemDto[]> {
    return this.recipeCategoriesService.listAll();
  }
}
