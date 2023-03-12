import { Module } from '@nestjs/common';
import { RecipeCategoriesController } from './recipe-categories.controller';
import { RecipeCategoriesService } from './services';
import { RecipeCategory } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeCategoryRepository } from './repositories';


@Module({
  imports: [ TypeOrmModule.forFeature([RecipeCategory]),],
  controllers: [RecipeCategoriesController],
  providers: [RecipeCategoriesService, RecipeCategoryRepository]
})
export class RecipeCategoriesModule {
}
