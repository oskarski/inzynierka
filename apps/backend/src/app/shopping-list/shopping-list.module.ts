import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ShoppingListController],
  providers: [],
})
export class ShoppingListModule {}
