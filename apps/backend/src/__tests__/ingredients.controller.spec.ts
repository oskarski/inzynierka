import { IngredientsController } from '../app/ingredients/ingredients.controller';
import { Ingredient } from '../app/ingredients/entities';
import { TestContext } from './utils';

const testCtx = new TestContext();

testCtx.startAppBeforeAll().closeAppAfterAll();

describe(IngredientsController.name, () => {
  beforeEach(async () => {
    await testCtx.repositories.ingredientRepository
      .createQueryBuilder()
      .delete()
      .execute();

    await testCtx.repositories.ingredientRepository
      .createQueryBuilder()
      .insert()
      .into(Ingredient)
      .values([
        { name: 'jagody goji' },
        { name: 'czarnuszka' },
        { name: 'drożdże' },
        { name: 'brunatne pieczarki' },
        { name: 'ser żółty wędzony' },
        { name: 'suszone śliwki' },
        { name: 'powidła śliwkowe' },
        { name: 'pomidor' },
        { name: 'pomarańcza' },
        { name: 'pomidorki koktajlowe' },
        { name: 'wiśnie' },
        { name: 'świeże prawdziwki' },
        { name: 'duże ziemniaki bio' },
      ])
      .execute();
  });

  describe('listAll()', () => {
    it('returns search results matching the query', async () => {
      const ingredients =
        await testCtx.controllers.ingredientController.listAll({
          name: 'po',
        });

      expect(ingredients).toEqual([
        expect.objectContaining({ name: 'pomarańcza' }),
        expect.objectContaining({ name: 'pomidor' }),
        expect.objectContaining({ name: 'pomidorki koktajlowe' }),
        expect.objectContaining({ name: 'powidła śliwkowe' }),
      ]);
    });
  });
});
