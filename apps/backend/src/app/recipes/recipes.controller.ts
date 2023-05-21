import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  IPaginated,
  IRecipeDto,
  IRecipeListItemDto,
  RecipeId,
} from '@lib/shared';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { RecipesService } from './services';
import { ListRecipesQueryDto } from './dtos';
import { User } from '../iam/entities';
import { IReviewListItemDto } from '@lib/shared/dist/types/reviews';

import { ReviewsService } from '../reviews/services';

@Controller('recipes')
@UseGuards(PrivateApiGuard)
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Get()
  async listRecipesPaginated(
    @Query() queryDto: ListRecipesQueryDto,
  ): Promise<IPaginated<IRecipeListItemDto>> {
    return this.recipesService.listRecipesPaginated(queryDto);
  }

  @Get('/:id')
  async getRecipeDetails(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<IRecipeDto> {
    return this.recipesService.getRecipe(id, currentUser.id);
  }

  @Post('/:id/reviews')
  async addReview(
    @Param('id') id: RecipeId,
    @CurrentUser() currentUser: User,
    @Body() reviewDto: IReviewListItemDto,
  ): Promise<void> {
    return this.reviewsService.addReview(id, currentUser.id, reviewDto);
  }
}
