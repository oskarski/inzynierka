import '@testing-library/jest-dom';
import { TestContext } from '../utils';
import {
  Id,
  RecipeCategoryListItemDtoBuilder,
  RecipeListItemDtoBuilder,
} from '@lib/shared';
import { findAllByText, findByText } from '@testing-library/react';
import RecipesPage from '@fe/pages/recipes';

const testContext = new TestContext();

testContext.api.recipesCategoriesApi.listAllCategories.mockResolvedValue([
  RecipeCategoryListItemDtoBuilder.prefilled()
    .havingId(Id('49062c6f-401e-4fb1-a3de-9bec74df8081'))
    .named('Lekkie i Fit')
    .build(),
  RecipeCategoryListItemDtoBuilder.prefilled()
    .havingId(Id('7263df84-ac67-4cdd-8c0c-860caff5fb90'))
    .named('Obiad')
    .build(),
  RecipeCategoryListItemDtoBuilder.prefilled()
    .havingId(Id('b7bcb176-3bbc-4ef0-b0cb-5b0ff1332fc7'))
    .named('Śniadanie')
    .build(),
]);
testContext.api.recipesApi.listPaginatedRecipes.mockResolvedValue({
  total: 3,
  data: [
    RecipeListItemDtoBuilder.prefilled()
      .named('Pizza margarita')
      .described('Królowa gatunku, czyli margherita!')
      .havingPreparationTime(1500)
      .havingPortions(8)
      .havingCategories(Id('7263df84-ac67-4cdd-8c0c-860caff5fb90'))
      .build(),
    RecipeListItemDtoBuilder.prefilled()
      .named('Kanapka z szynką')
      .described('Klasyka gatunku!')
      .havingPreparationTime(300)
      .havingPortions(1)
      .havingCategories(Id('b7bcb176-3bbc-4ef0-b0cb-5b0ff1332fc7'))
      .build(),
    RecipeListItemDtoBuilder.prefilled()
      .named('Hot Dog')
      .described('Bardzo dobry!')
      .havingPreparationTime(900)
      .havingPortions(5)
      .havingCategories(
        Id('b7bcb176-3bbc-4ef0-b0cb-5b0ff1332fc7'),
        Id('7263df84-ac67-4cdd-8c0c-860caff5fb90')
      )
      .build(),
  ],
});

describe(RecipesPage.name, () => {
  it('renders recipes', async () => {
    await testContext.signedIn().renderPrivatePage(<RecipesPage />);

    await findByText(testContext.container, /^Pizza margarita$/);
    await findAllByText(testContext.container, /^Obiad$/);

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"Pasujące przepisyObiadPizza margaritaKrólowa gatunku, czyli margherita!0:258ŚniadanieKanapka z szynkąKlasyka gatunku!0:051ŚniadanieObiadHot DogBardzo dobry!0:155"`
    );
  });
});
