import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Recipe,
  RecipeIngredient,
  RecipeCategory,
  RecipeDetailsViewEntity,
} from './entities';
import { RecipesService } from './services';
import { RecipesRepository } from './repositories';
import { IamModule } from '../iam';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      RecipeIngredient,
      RecipeCategory,
      RecipeDetailsViewEntity,
    ]),
    IamModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService, RecipesRepository],
})
export class RecipesModule {}
