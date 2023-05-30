import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingList } from './entities';
import { ShoppingListService } from './services';
import { ShoppingListRepository } from './repositories';
import { Ingredient } from '../ingredients/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingList, Ingredient])],
  controllers: [ShoppingListController],
  providers: [ShoppingListService, ShoppingListRepository],
})
export class ShoppingListModule {}
