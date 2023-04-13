import { RecipesController } from '../app/recipes/recipes.controller';
import { Recipe } from '../app/recipes/entities';
import { TestContext } from './utils';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(RecipesController.name, () => {
  beforeEach(async () => {
    await testCtx.repositories.recipeRepository
      .createQueryBuilder()
      .delete()
      .execute();

    await testCtx.repositories.recipeRepository
      .createQueryBuilder()
      .insert()
      .into(Recipe)
      .values([
        {
          name: 'Pizza margarita',
          description: 'Królowa gatunku, czyli margherita!',
          preparationTime: 1500,
          portions: 8,
        },
        {
          name: 'Kanapka z szynką',
          description: 'Klasyka gatunku!',
          preparationTime: 300,
          portions: 1,
        },
        {
          name: 'Hot Dog',
          description: 'Bardzo dobry!',
          preparationTime: 900,
          portions: 5,
        },
      ])
      .execute();
  });

  describe('findRecipesPaginated()', () => {
    it('returns paginated recipes', async () => {
      const { data: recipes, total } =
        await testCtx.controllers.recipeController.findRecipesPaginated();

      expect(total).toBe(3);
      expect(recipes).toEqual([
        expect.objectContaining({
          name: 'Pizza margarita',
          description: 'Królowa gatunku, czyli margherita!',
          preparationTime: 1500,
          portions: 8,
        }),
        expect.objectContaining({
          name: 'Kanapka z szynką',
          description: 'Klasyka gatunku!',
          preparationTime: 300,
          portions: 1,
        }),
        expect.objectContaining({
          name: 'Hot Dog',
          description: 'Bardzo dobry!',
          preparationTime: 900,
          portions: 5,
        }),
      ]);
    });
  });
});
