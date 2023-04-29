import { Module } from '@nestjs/common';
import { RecipeCategoriesController } from './recipe-categories.controller';
import { RecipeCategoriesService } from './services';
import { Category } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCategoryRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [RecipeCategoriesController],
  providers: [RecipeCategoriesService, RecipeCategoryRepository],
})
export class RecipeCategoriesModule {}
