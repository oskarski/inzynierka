import { RecipesController } from '../app/recipes/recipes.controller';
import { Recipe } from '../app/recipes/entities';
import { TestContext } from './utils';
import { RecipeCategory } from '../app/recipe-categories/entities';
import { Id } from '@lib/shared';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(RecipesController.name, () => {
  const firstCategory = new RecipeCategory();
  firstCategory.id = Id('49062c6f-401e-4fb1-a3de-9bec74df8081');
  firstCategory.name = 'Lekkie i Fit';

  const secondCategory = new RecipeCategory();
  secondCategory.id = Id('7263df84-ac67-4cdd-8c0c-860caff5fb90');
  secondCategory.name = 'Obiad';

  const thirdCategory = new RecipeCategory();
  thirdCategory.id = Id('b7bcb176-3bbc-4ef0-b0cb-5b0ff1332fc7');
  thirdCategory.name = 'Śniadanie';

  beforeEach(async () => {
    await testCtx.repositories.recipeRepository
      .createQueryBuilder()
      .delete()
      .execute();
    await testCtx.repositories.recipesCategoriesRepository
      .createQueryBuilder()
      .delete()
      .execute();

    await testCtx.repositories.recipesCategoriesRepository.save([
      firstCategory,
      secondCategory,
      thirdCategory,
    ]);

    const firstRecipe = new Recipe();
    firstRecipe.name = 'Pizza margarita';
    firstRecipe.description = 'Królowa gatunku, czyli margherita!';
    firstRecipe.preparationTime = 1500;
    firstRecipe.portions = 8;
    firstRecipe.categories = [secondCategory];

    const secondRecipe = new Recipe();
    secondRecipe.name = 'Kanapka z szynką';
    secondRecipe.description = 'Klasyka gatunku!';
    secondRecipe.preparationTime = 300;
    secondRecipe.portions = 1;
    secondRecipe.categories = [thirdCategory];

    const thirdRecipe = new Recipe();
    thirdRecipe.name = 'Hot Dog';
    thirdRecipe.description = 'Bardzo dobry!';
    thirdRecipe.preparationTime = 900;
    thirdRecipe.portions = 5;
    thirdRecipe.categories = [thirdCategory, secondCategory];

    await testCtx.repositories.recipeRepository.save([
      firstRecipe,
      secondRecipe,
      thirdRecipe,
    ]);
  });

  describe('findRecipesPaginated()', () => {
    it('returns paginated recipes', async () => {
      const firstPage =
        await testCtx.controllers.recipeController.findRecipesPaginated({
          page: 0,
          perPage: 2,
        });
      const secondPage =
        await testCtx.controllers.recipeController.findRecipesPaginated({
          page: 1,
          perPage: 2,
        });

      expect(firstPage.total).toBe(3);
      expect(firstPage.data).toEqual([
        {
          id: expect.any(String),
          name: 'Pizza margarita',
          description: 'Królowa gatunku, czyli margherita!',
          preparationTime: 1500,
          portions: 8,
          categoryIds: [secondCategory.id],
        },
        {
          id: expect.any(String),
          name: 'Kanapka z szynką',
          description: 'Klasyka gatunku!',
          preparationTime: 300,
          portions: 1,
          categoryIds: [thirdCategory.id],
        },
      ]);

      expect(secondPage.total).toBe(3);
      expect(secondPage.data).toEqual([
        {
          id: expect.any(String),
          name: 'Hot Dog',
          description: 'Bardzo dobry!',
          preparationTime: 900,
          portions: 5,
          categoryIds: expect.arrayContaining([
            thirdCategory.id,
            secondCategory.id,
          ]),
        },
      ]);
    });
  });
});
