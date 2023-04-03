import { Controller, Get } from '@nestjs/common';
import { IIngredientListItemDto } from '@lib/shared';

@Controller('ingredients')
export class IngredientsController {
  @Get()
  async listAll(): Promise<IIngredientListItemDto[]> {
    return [
      { id: '1', name: 'Pomidor' },
      { id: '2', name: 'Papryka' },
      { id: '3', name: 'Pierś kurczaka' },
    ] as IIngredientListItemDto[];
  }
}
