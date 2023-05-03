import { FavouriteRecipesController } from '../app/recipes/favourite-recipes.controller';
import { TestContext } from './utils';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(FavouriteRecipesController.name, () => {
  describe('addRecipeToFavorites()', () => {
    it.todo('adds recipe to favourites');
  });

  describe('listFavouriteRecipes()', () => {
    it.todo('lists favourite recipes');
  });

  describe('removeRecipeFromFavorites()', () => {
    it.todo('removes recipe from favourite');
  });
});
