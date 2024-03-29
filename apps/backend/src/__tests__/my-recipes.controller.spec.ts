import { TestContext } from './utils';
import { MyRecipesController } from '../app/recipes/my-recipes.controller';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(MyRecipesController.name, () => {
  describe('createRecipe()', () => {
    it.todo('creates recipe');
  });

  describe('createAndPublishRecipe()', () => {
    it.todo('creates published recipe');
  });

  describe('listRecipes()', () => {
    it.todo('lists signed in user recipes');
  });

  describe('publishRecipe()', () => {
    it.todo('publishes recipe');
  });
});
