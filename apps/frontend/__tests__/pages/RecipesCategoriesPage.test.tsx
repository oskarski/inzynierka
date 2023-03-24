import '@testing-library/jest-dom';
import CategoriesPage from '@fe/pages/categories';
import { TestContext } from '../utils';
import { RecipeCategoryListItemDtoBuilder } from '@lib/shared';
import { findByText } from '@testing-library/react';

const testContext = new TestContext();

testContext.api.recipesCategoriesApi.listAllCategories.mockResolvedValue([
  RecipeCategoryListItemDtoBuilder.prefilled().named('Kuchnia Włoska').build(),
  RecipeCategoryListItemDtoBuilder.prefilled()
    .named('Kuchnia Hiszpańska')
    .build(),
  RecipeCategoryListItemDtoBuilder.prefilled().named('Lekkie i Fit').build(),
]);

describe(CategoriesPage.name, () => {
  it('renders a heading', async () => {
    await testContext.render(<CategoriesPage />);

    await findByText(testContext.container, /^Lekkie i Fit$/);

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"KategorieKuchnia WłoskaKuchnia HiszpańskaLekkie i Fit"`
    );
  });
});
