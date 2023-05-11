import { RecipesController } from '../app/recipes/recipes.controller';
import {
  Recipe,
  RecipeCategory,
  RecipeIngredient,
} from '../app/recipes/entities';
import { TestContext } from './utils';
import { Category } from '../app/recipe-categories/entities';
import { Id, RecipeState } from '@lib/shared';
import { Ingredient } from '../app/ingredients/entities';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(RecipesController.name, () => {
  const firstCategory = new Category();
  firstCategory.id = Id('49062c6f-401e-4fb1-a3de-9bec74df8081');
  firstCategory.name = 'Lekkie i Fit';

  const secondCategory = new Category();
  secondCategory.id = Id('7263df84-ac67-4cdd-8c0c-860caff5fb90');
  secondCategory.name = 'Obiad';

  const thirdCategory = new Category();
  thirdCategory.id = Id('b7bcb176-3bbc-4ef0-b0cb-5b0ff1332fc7');
  thirdCategory.name = 'Śniadanie';

  const flourIngredient = new Ingredient();
  flourIngredient.id = Id('c1a03fdc-b158-4768-afc2-dae2fefe6209');
  flourIngredient.name = 'Mąka';
  const tomatoSauceIngredient = new Ingredient();
  tomatoSauceIngredient.id = Id('b7eac4e1-6cfd-458c-a57c-ab35e4b0f6e8');
  tomatoSauceIngredient.name = 'Sos pomidorowy';
  const mozzarellaIngredient = new Ingredient();
  mozzarellaIngredient.id = Id('a0bd90c6-a5a9-4370-b907-faae2b6722cd');
  mozzarellaIngredient.name = 'Mozzarella';
  const breadIngredient = new Ingredient();
  breadIngredient.id = Id('8cd14ef7-2bc4-4584-8470-5e2b9cc7f709');
  breadIngredient.name = 'Chleb';
  const hamIngredient = new Ingredient();
  hamIngredient.id = Id('fd06ead3-0419-4098-b0ba-4075a94e0d3f');
  hamIngredient.name = 'Szynka';
  const sausageIngredient = new Ingredient();
  sausageIngredient.id = Id('9cfaae3d-72c4-41be-8ed4-aeb602674dfc');
  sausageIngredient.name = 'Parówka';
  const ketchupIngredient = new Ingredient();
  ketchupIngredient.id = Id('6f292523-67a9-4d2f-a12f-cfa3b27c72ce');
  ketchupIngredient.name = 'Ketchup';
  const mustardIngredient = new Ingredient();
  mustardIngredient.id = Id('105c97db-8e14-46c1-81cd-cfe3cd35c505');
  mustardIngredient.name = 'Musztarda';
  const onionIngredient = new Ingredient();
  onionIngredient.id = Id('c6114950-f3d1-48b8-b49e-b80b0accc1f0');
  onionIngredient.name = 'Prażona cebulka';

  const deleteTestData = async () => {
    await testCtx.repositories.recipeCategoriesRepository
      .createQueryBuilder()
      .delete()
      .execute();
    await testCtx.repositories.recipeIngredientsRepository
      .createQueryBuilder()
      .delete()
      .execute();
    await testCtx.repositories.recipeRepository
      .createQueryBuilder()
      .delete()
      .execute();
    await testCtx.repositories.categoriesRepository
      .createQueryBuilder()
      .delete()
      .execute();
    await testCtx.repositories.ingredientRepository
      .createQueryBuilder()
      .delete()
      .execute();
  };

  beforeEach(async () => {
    await deleteTestData();

    await testCtx.repositories.categoriesRepository.save([
      firstCategory,
      secondCategory,
      thirdCategory,
    ]);

    await testCtx.repositories.ingredientRepository.save([
      flourIngredient,
      tomatoSauceIngredient,
      mozzarellaIngredient,
      breadIngredient,
      hamIngredient,
      sausageIngredient,
      ketchupIngredient,
      mustardIngredient,
      onionIngredient,
    ]);

    const firstRecipe = new Recipe();
    firstRecipe.id = Id('3fe1b69b-3970-42e7-aa31-982f58472163');
    firstRecipe.state = RecipeState.published;
    firstRecipe.name = 'Pizza margarita';
    firstRecipe.description = 'Królowa gatunku, czyli margherita!';
    firstRecipe.preparationTime = 1500;
    firstRecipe.portions = 8;
    firstRecipe.instructions = [
      { step: 'Weź telefon' },
      { step: 'Zamów pizze' },
      { step: 'Smacznego!' },
    ];

    const secondRecipe = new Recipe();
    secondRecipe.id = Id('88271d4c-ed68-446b-a135-e89521b1718e');
    secondRecipe.state = RecipeState.published;
    secondRecipe.name = 'Kanapka z szynką';
    secondRecipe.description = 'Klasyka gatunku!';
    secondRecipe.preparationTime = 300;
    secondRecipe.portions = 1;

    const thirdRecipe = new Recipe();
    thirdRecipe.id = Id('e4d81d15-4ad6-4f21-aec1-8a24af414aa4');
    thirdRecipe.state = RecipeState.published;
    thirdRecipe.name = 'Hot Dog';
    thirdRecipe.description = 'Bardzo dobry!';
    thirdRecipe.preparationTime = 900;
    thirdRecipe.portions = 5;

    await testCtx.repositories.recipeRepository.save([
      firstRecipe,
      secondRecipe,
      thirdRecipe,
    ]);

    const firstRecipeFirstIngredient = new RecipeIngredient();
    firstRecipeFirstIngredient.recipeId = firstRecipe.id;
    firstRecipeFirstIngredient.ingredientId = flourIngredient.id;
    firstRecipeFirstIngredient.quantity = 320;
    firstRecipeFirstIngredient.unit = 'g';
    const firstRecipeSecondIngredient = new RecipeIngredient();
    firstRecipeSecondIngredient.recipeId = firstRecipe.id;
    firstRecipeSecondIngredient.ingredientId = tomatoSauceIngredient.id;
    firstRecipeSecondIngredient.quantity = 1;
    firstRecipeSecondIngredient.unit = 'szt.';
    const firstRecipeThirdIngredient = new RecipeIngredient();
    firstRecipeThirdIngredient.recipeId = firstRecipe.id;
    firstRecipeThirdIngredient.ingredientId = mozzarellaIngredient.id;
    firstRecipeThirdIngredient.quantity = 250;
    firstRecipeThirdIngredient.unit = 'g';

    const secondRecipeFirstIngredient = new RecipeIngredient();
    secondRecipeFirstIngredient.recipeId = secondRecipe.id;
    secondRecipeFirstIngredient.ingredientId = breadIngredient.id;
    secondRecipeFirstIngredient.quantity = 2;
    secondRecipeFirstIngredient.unit = 'kromki';
    const secondRecipeSecondIngredient = new RecipeIngredient();
    secondRecipeSecondIngredient.recipeId = secondRecipe.id;
    secondRecipeSecondIngredient.ingredientId = hamIngredient.id;
    secondRecipeSecondIngredient.quantity = 2;
    secondRecipeSecondIngredient.unit = 'plasterki';

    const thirdRecipeFirstIngredient = new RecipeIngredient();
    thirdRecipeFirstIngredient.recipeId = thirdRecipe.id;
    thirdRecipeFirstIngredient.ingredientId = breadIngredient.id;
    thirdRecipeFirstIngredient.quantity = 1;
    thirdRecipeFirstIngredient.unit = 'szt.';
    const thirdRecipeSecondIngredient = new RecipeIngredient();
    thirdRecipeSecondIngredient.recipeId = thirdRecipe.id;
    thirdRecipeSecondIngredient.ingredientId = sausageIngredient.id;
    thirdRecipeSecondIngredient.quantity = 1;
    thirdRecipeSecondIngredient.unit = 'szt.';
    const thirdRecipeThirdIngredient = new RecipeIngredient();
    thirdRecipeThirdIngredient.recipeId = thirdRecipe.id;
    thirdRecipeThirdIngredient.ingredientId = ketchupIngredient.id;
    thirdRecipeThirdIngredient.quantity = 10;
    thirdRecipeThirdIngredient.unit = 'g';
    const thirdRecipeFourthIngredient = new RecipeIngredient();
    thirdRecipeFourthIngredient.recipeId = thirdRecipe.id;
    thirdRecipeFourthIngredient.ingredientId = mustardIngredient.id;
    thirdRecipeFourthIngredient.quantity = 10;
    thirdRecipeFourthIngredient.unit = 'g';
    const thirdRecipeFifthIngredient = new RecipeIngredient();
    thirdRecipeFifthIngredient.recipeId = thirdRecipe.id;
    thirdRecipeFifthIngredient.ingredientId = onionIngredient.id;
    thirdRecipeFifthIngredient.quantity = 10;
    thirdRecipeFifthIngredient.unit = 'g';

    await testCtx.repositories.recipeIngredientsRepository.save([
      firstRecipeFirstIngredient,
      firstRecipeSecondIngredient,
      firstRecipeThirdIngredient,
      secondRecipeFirstIngredient,
      secondRecipeSecondIngredient,
      thirdRecipeFirstIngredient,
      thirdRecipeSecondIngredient,
      thirdRecipeThirdIngredient,
      thirdRecipeFourthIngredient,
      thirdRecipeFifthIngredient,
    ]);

    const firstRecipeSecondCategory = new RecipeCategory();
    firstRecipeSecondCategory.recipeId = firstRecipe.id;
    firstRecipeSecondCategory.categoryId = secondCategory.id;

    const secondRecipeThirdCategory = new RecipeCategory();
    secondRecipeThirdCategory.recipeId = secondRecipe.id;
    secondRecipeThirdCategory.categoryId = thirdCategory.id;

    const thirdRecipeThirdCategory = new RecipeCategory();
    thirdRecipeThirdCategory.recipeId = thirdRecipe.id;
    thirdRecipeThirdCategory.categoryId = thirdCategory.id;
    const thirdRecipeSecondCategory = new RecipeCategory();
    thirdRecipeSecondCategory.recipeId = thirdRecipe.id;
    thirdRecipeSecondCategory.categoryId = secondCategory.id;

    await testCtx.repositories.recipeCategoriesRepository.save([
      firstRecipeSecondCategory,
      secondRecipeThirdCategory,
      thirdRecipeThirdCategory,
      thirdRecipeSecondCategory,
    ]);
  });

  afterAll(async () => {
    await deleteTestData();
  });

  describe('listRecipesPaginated()', () => {
    describe('returns paginated recipes', () => {
      it('empty filters', async () => {
        const firstPage =
          await testCtx.controllers.recipeController.listRecipesPaginated({
            page: 0,
            perPage: 2,
            ingredients: [],
          });
        const secondPage =
          await testCtx.controllers.recipeController.listRecipesPaginated({
            page: 1,
            perPage: 2,
            ingredients: [],
          });

        expect(firstPage.total).toBe(3);
        expect(firstPage.data).toEqual([
          {
            id: expect.any(String),
            state: RecipeState.published,
            name: 'Pizza margarita',
            description: 'Królowa gatunku, czyli margherita!',
            preparationTime: 1500,
            portions: 8,
            categoryIds: [secondCategory.id],
          },
          {
            id: expect.any(String),
            state: RecipeState.published,
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
            state: RecipeState.published,
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

      it('ingredient filters', async () => {
        const firstPage =
          await testCtx.controllers.recipeController.listRecipesPaginated({
            page: 0,
            perPage: 2,
            ingredients: [
              { id: breadIngredient.id },
              { id: sausageIngredient.id },
            ],
          });

        expect(firstPage.total).toBe(2);
        expect(firstPage.data).toEqual([
          // Matches 1/2 = 50% ingredient
          {
            id: expect.any(String),
            state: RecipeState.published,
            name: 'Kanapka z szynką',
            description: 'Klasyka gatunku!',
            preparationTime: 300,
            portions: 1,
            categoryIds: [thirdCategory.id],
            ingredientsCoverage: 0.5,
          },
          // Matches 2/5 = 40% ingredients
          {
            id: expect.any(String),
            state: RecipeState.published,
            name: 'Hot Dog',
            description: 'Bardzo dobry!',
            preparationTime: 900,
            portions: 5,
            categoryIds: expect.arrayContaining([
              thirdCategory.id,
              secondCategory.id,
            ]),
            ingredientsCoverage: 0.4,
          },
        ]);
      });
    });
  });

  describe('getRecipeDetails()', () => {
    it('returns recipe details', async () => {
      const foundRecipe =
        await testCtx.controllers.recipeController.getRecipeDetails(
          Id('3fe1b69b-3970-42e7-aa31-982f58472163'),
        );

      expect(foundRecipe).toEqual({
        id: '3fe1b69b-3970-42e7-aa31-982f58472163',
        name: 'Pizza margarita',
        description: 'Królowa gatunku, czyli margherita!',
        preparationTime: 1500,
        portions: 8,
        categoryIds: ['7263df84-ac67-4cdd-8c0c-860caff5fb90'],
        instructions: [
          { step: 'Weź telefon' },
          { step: 'Zamów pizze' },
          { step: 'Smacznego!' },
        ],
        ingredients: [
          {
            id: expect.stringContaining('-'),
            name: 'Mąka',
            quantity: 320,
            unit: 'g',
          },
          {
            id: expect.stringContaining('-'),
            name: 'Sos pomidorowy',
            quantity: 1,
            unit: 'szt.',
          },
          {
            id: expect.stringContaining('-'),
            name: 'Mozzarella',
            quantity: 250,
            unit: 'g',
          },
        ],
      });
    });
  });
});
