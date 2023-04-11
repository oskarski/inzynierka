import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IIngredientListItemDto } from '@lib/shared';
import { PrivateApiGuard } from '../auth';
import { IngredientsService } from './services';
import { ListIngredientsDto } from './dtos';

@Controller('ingredients')
// @UseGuards(PrivateApiGuard)
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async listAll(
    @Query() searchDto: ListIngredientsDto,
  ): Promise<IIngredientListItemDto[]> {
    return this.ingredientsService.findIngredients(searchDto);
  }
}
