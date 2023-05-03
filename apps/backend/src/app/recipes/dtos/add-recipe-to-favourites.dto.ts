import { IAddRecipeToFavouritesDto, RecipeId } from '@lib/shared';
import { IsUUID } from 'class-validator';

export class AddRecipeToFavouritesDto implements IAddRecipeToFavouritesDto {
  @IsUUID()
  readonly recipeId: RecipeId;
}
