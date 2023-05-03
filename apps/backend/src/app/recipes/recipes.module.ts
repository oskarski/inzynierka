import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Recipe,
  RecipeIngredient,
  RecipeCategory,
  RecipeDetailsViewEntity,
} from './entities';
import {
  FavouriteRecipesService,
  RecipesService,
  MyRecipesService,
} from './services';
import { RecipesRepository } from './repositories';
import { IamModule } from '../iam';
import { FavouriteRecipesController } from './favourite-recipes.controller';
import { MyRecipesController } from './my-recipes.controller';

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
  controllers: [
    RecipesController,
    MyRecipesController,
    FavouriteRecipesController,
  ],
  providers: [
    RecipesService,
    FavouriteRecipesService,
    MyRecipesService,
    RecipesRepository,
  ],
})
export class RecipesModule {}
