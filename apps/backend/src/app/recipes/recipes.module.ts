import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities';
import { RecipesService } from './services';
import { RecipesRepository } from './repositories';
import { IamModule } from '../iam';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), IamModule],
  controllers: [RecipesController],
  providers: [RecipesService, RecipesRepository],
})
export class RecipesModule {}
