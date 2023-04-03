import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';

@Module({
  imports: [],
  controllers: [IngredientsController],
  providers: [],
})
export class IngredientsModule {}
