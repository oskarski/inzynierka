import '@testing-library/jest-dom';
import { TestContext } from '../utils';
import { RecipeListItemDtoBuilder } from '@lib/shared';
import { findByText } from '@testing-library/react';
import RecipesPage from '@fe/pages/recipes';

const testContext = new TestContext();

testContext.api.recipesApi.listPaginatedRecipes.mockResolvedValue({
  total: 3,
  data: [
    RecipeListItemDtoBuilder.prefilled()
      .named('Pizza margarita')
      .described('Królowa gatunku, czyli margherita!')
      .havingPreparationTime(1500)
      .havingPortions(8)
      .build(),
    RecipeListItemDtoBuilder.prefilled()
      .named('Kanapka z szynką')
      .described('Klasyka gatunku!')
      .havingPreparationTime(300)
      .havingPortions(1)
      .build(),
    RecipeListItemDtoBuilder.prefilled()
      .named('Hot Dog')
      .described('Bardzo dobry!')
      .havingPreparationTime(900)
      .havingPortions(5)
      .build(),
  ],
});

describe(RecipesPage.name, () => {
  it('renders recipes', async () => {
    await testContext.signedIn().render(<RecipesPage />);

    await findByText(testContext.container, /^Pizza margarita$/);

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"Pasujące przepisyPizza margaritaKrólowa gatunku, czyli margherita!0:258Kanapka z szynkąKlasyka gatunku!0:051Hot DogBardzo dobry!0:155"`
    );
  });
});
