import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrivateApiGuard } from '../auth';
import { IShoppingListItemDto } from '@lib/shared';

@Controller('shopping-list')
@UseGuards(PrivateApiGuard)
export class ShoppingListController {
  constructor() {}

  @Get()
  async listShoppingListItems(): Promise<IShoppingListItemDto[]> {
    // TODO Drop hardcoded list
    return [
      {
        id: '1',
        name: 'Pomidorki koktajlowe',
        quantity: 0.5,
        unit: 'kg',
        completed: false,
      },
      {
        id: '2',
        name: 'Pomidory w puszce',
        quantity: 400,
        unit: 'ml',
        completed: true,
      },
      {
        id: '3',
        name: 'Ząbek czosnku',
        quantity: 1,
        unit: 'szt.',
        completed: false,
      },
    ] as IShoppingListItemDto[];
  }
}
