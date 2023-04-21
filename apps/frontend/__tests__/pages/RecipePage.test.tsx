import '@testing-library/jest-dom';
import { TestContext } from '../utils';
import {
  Id,
  RecipeCategoryListItemDtoBuilder,
  RecipeDtoBuilder,
} from '@lib/shared';
import { findAllByText, findByText } from '@testing-library/react';
import RecipeDetailsPage from '@fe/pages/recipes/[recipeId]';

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
]);
testContext.api.recipesApi.getRecipeDetails.mockResolvedValue(
  RecipeDtoBuilder.prefilled()
    .havingId(Id('8a1b797a-f436-496e-82e1-faae34af0b2d'))
    .named('Pizza margarita')
    .described('Królowa gatunku, czyli margherita!')
    .havingPreparationTime(1500)
    .havingPortions(8)
    .havingCategories(Id('7263df84-ac67-4cdd-8c0c-860caff5fb90'))
    .withInstructions(
      'Zrób ciasto',
      'Dodaj składniki',
      'Wsadź do piekarnika na 10min'
    )
    .build()
);

describe(RecipeDetailsPage.name, () => {
  it('renders recipes', async () => {
    await testContext
      .signedIn()
      .renderPrivatePage(
        <RecipeDetailsPage
          recipeId={Id('8a1b797a-f436-496e-82e1-faae34af0b2d')}
        />
      );

    await findByText(testContext.container, /^Pizza margarita$/);
    await findAllByText(testContext.container, /^Obiad$/);

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"ObiadPizza margaritaKrólowa gatunku, czyli margherita!0:25Krok 1:Zrób ciastoKrok 2:Dodaj składnikiKrok 3:Wsadź do piekarnika na 10min"`
    );
  });
});
