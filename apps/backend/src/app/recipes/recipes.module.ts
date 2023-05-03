import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Recipe,
  RecipeIngredient,
  RecipeCategory,
  RecipeDetailsViewEntity,
} from './entities';
import { FavouriteRecipesService, RecipesService } from './services';
import { RecipesRepository } from './repositories';
import { IamModule } from '../iam';
import { FavouriteRecipesController } from './favourite-recipes.controller';

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
  controllers: [RecipesController, FavouriteRecipesController],
  providers: [RecipesService, FavouriteRecipesService, RecipesRepository],
})
export class RecipesModule {}
