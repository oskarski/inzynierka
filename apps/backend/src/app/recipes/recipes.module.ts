import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Recipe,
  RecipeIngredient,
  RecipeCategory,
  RecipeDetailsViewEntity,
  RecipeListItemViewEntity,
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
import { Review } from '../reviews/entities';
import { ReviewsService } from '../reviews/services';
import { ReviewRepository } from '../reviews/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      RecipeIngredient,
      RecipeCategory,
      RecipeDetailsViewEntity,
      Review,
      RecipeListItemViewEntity,
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
    ReviewsService,
    ReviewRepository,
  ],
})
export class RecipesModule {}
