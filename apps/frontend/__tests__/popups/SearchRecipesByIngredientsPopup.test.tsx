import '@testing-library/jest-dom';
import { ButtonHandle, InputHandle, TestContext } from '../utils';
import { findAllByText, findByText, Matcher } from '@testing-library/react';
import { IngredientListItemDtoBuilder } from '@lib/shared';
import { SearchRecipesByIngredientsPopupContent } from '@fe/recipes';
import { routes } from '@fe/utils';

const testContext = new TestContext();

testContext.api.ingredientsApi.listIngredients.mockResolvedValue([]);

describe(SearchRecipesByIngredientsPopupContent.name, () => {
  it('allows to search for ingredients and select them', async () => {
    testContext.api.ingredientsApi.listIngredients.mockResolvedValueOnce([
      IngredientListItemDtoBuilder.prefilled().named('Pomidor').build(),
      IngredientListItemDtoBuilder.prefilled().named('Papryka').build(),
      IngredientListItemDtoBuilder.prefilled().named('Pierś kurczaka').build(),
    ]);

    await testContext
      .signedIn()
      .renderPrivatePopup(<SearchRecipesByIngredientsPopupContent />)
      .then(() => findAllByText(testContext.container, /^Dodaj$/));

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"Jakie masz składniki?PomidorDodajPaprykaDodajPierś kurczakaDodajSzukamy!"`
    );

    await selectIngredient(/^Papryka$/);

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"Jakie masz składniki?PomidorDodajPaprykaDodanoPierś kurczakaDodajTwoje składnikiPaprykaUsuńSzukamy!"`
    );

    testContext.api.ingredientsApi.listIngredients.mockResolvedValueOnce([
      IngredientListItemDtoBuilder.prefilled().named('Marchewka').build(),
      IngredientListItemDtoBuilder.prefilled().named('Mango').build(),
      IngredientListItemDtoBuilder.prefilled().named('Majonez').build(),
    ]);

    const searchInput = InputHandle.fromPlaceholder(
      testContext.container,
      /^Szukaj składników$/
    );

    await searchInput
      .type('ma')
      .then(() => findByText(testContext.container, /^Marchewka$/));

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"Jakie masz składniki?MarchewkaDodajMangoDodajMajonezDodajTwoje składnikiPaprykaUsuńSzukamy!"`
    );

    await selectIngredient(/^Marchewka$/);

    expect(testContext.container.textContent).toMatchInlineSnapshot(
      `"Jakie masz składniki?MarchewkaDodanoMangoDodajMajonezDodajTwoje składnikiPaprykaUsuńMarchewkaUsuńSzukamy!"`
    );

    ButtonHandle.fromText(testContext.container, /^Szukamy!$/).click();

    await testContext.redirectsTo(routes.recipes());
  });
});

function selectIngredient(ingredientName: Matcher): Promise<void> {
  return findByText(testContext.container, ingredientName)
    .then((ingredientNameEl) =>
      ButtonHandle.fromText(
        ingredientNameEl.nextElementSibling as HTMLElement,
        /^Dodaj$/
      )
    )
    .then((addBtn) => addBtn.click());
}
