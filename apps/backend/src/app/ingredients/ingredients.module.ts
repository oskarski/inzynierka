import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities';
import { IngredientsService } from './services';
import { IngredientsRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientsRepository],
})
export class IngredientsModule {}
