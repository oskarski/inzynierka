import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { HydrateReactQueryState } from '../../server/server-react-query';
import { SignedInGuard } from '../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import { RecipeCategoryTag } from '@fe/recipes-categories';
import { SectionSubTitle, SectionTitle } from '@fe/components';
import { ShoppingOutlined, TeamOutlined } from '@ant-design/icons';
import { Stepper } from 'antd-mobile';
import {
  FavouriteRecipeButton,
  RecipeImage,
  RecipePreparationTime,
  RecipeRate,
} from '@fe/recipes';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function RecipesPage() {
  const recipe = {
    id: '1',
    name: 'Pizza margherita',
    description:
      'Królowa gatunku, czyli margherita, zachwyca prostotą składników, w których kryje się potęga smaku.',
    imageUrl: 'http://via.placeholder.com/396x226',
    rate: 4.7,
    formattedPreparationTime: '0:25',
    portions: 8,
    ingredients: [
      {
        name: 'cukier',
        quantity: 0.5,
        unit: 'łyżeczki',
      },
      { name: 'drożdże świeże', quantity: 21, unit: 'g' },
      { name: 'mąka pszenna', quantity: 320, unit: 'g' },
      { name: 'mąka pszenna', quantity: 320, unit: 'g' },
      { name: 'sól', quantity: 0.25, unit: 'łyżeczki' },
      { name: 'ząbek czosnku', quantity: 1, unit: 'szt.' },
      { name: 'mozzarella', quantity: 125, unit: 'g' },
      { name: 'pomidorki koktajlowe', quantity: 5, unit: 'szt.' },
      { name: 'pomidory krojone z puszki', quantity: 425, unit: 'ml' },
      { name: 'sól', quantity: 1, unit: 'szczypta' },
      { name: 'oregano suszone', quantity: 1, unit: 'szczypta' },
      { name: 'bazylia świeża', quantity: 5, unit: 'g' },
    ],
    instructions: [
      'Wyrośnięte ciasto przekładamy na blat oprószony mąką i delikatnie wyrabiamy palcami tak, by stopniowo formować coraz większy placek. WSKAZÓWKA! Ciasto na pizzę nie musi być bardzo cienkie: wystarczy uformować je na grubość ok. 1 cm. Uformowaną pizzę odkładamy na ok. 30 minut, by odpoczęło przed nałożeniem dodatków.',
      'Pomidory przekładamy do miseczki, doprawiamy solą, mieszamy. Ciasto smarujemy z wierzchu posolonymi pomidorami. Doprawiamy suszonym oregano. Wykładamy czosnek pokrojony w plasterki',
      'Pizzę przekładamy na blachę do pieczenia. Pieczemy ok. 10-13 minut w piekarniku rozgrzanym do temperatury 280°C. Po upływie połowy czasu przeznaczonego na pieczenie na pizzę wykładamy porwaną na mniejsze kawałki mozzarellę.',
      'Upieczoną pizzę dekorujemy z wierzchu pomidorkami koktajlowymi przekrojonymi na pół i listkami świeżej bazylii.',
      'WSKAZÓWKA! Pizzę posmarowaną jedynie sosem pomidorowym (lub oliwą w wersji bianco) możesz włożyć do piekarnika rozgrzanego do temperatury 280°C (na najniższe piętro) na ok. 5 minut, a następnie wyjąć z piekarnika i wyłożyć na nią pozostałe składniki. Takie etapowe pieczenie sprawi, że dodatki na pizzy będą bardziej świeże i apetyczne, a ciasto nieobciążone.',
    ],
  };
  const categories = [{ id: '1' as any, name: 'Kuchnia włoska' }];

  return (
    <>
      <Head>
        <title>{headTitle(`Przepisy | ${recipe.name}`)}</title>
      </Head>

      <main>
        {recipe.imageUrl && (
          <RecipeImage
            imageUrl={recipe.imageUrl}
            recipeName={recipe.name}
            className="mb-6 -mx-4"
          />
        )}

        <div className="px-2">
          {categories.length > 0 && (
            <div className="flex items-center space-x-2 mb-3">
              {categories.map((category) => (
                <RecipeCategoryTag key={category.id}>
                  {category.name}
                </RecipeCategoryTag>
              ))}
            </div>
          )}

          <SectionTitle className="mb-2">{recipe.name}</SectionTitle>

          <p className="text-sm font-normal text-secondary mb-4">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center text-sm text-secondary space-x-6">
              <RecipeRate rate={recipe.rate} />

              <RecipePreparationTime
                preparationTimeLabel={recipe.formattedPreparationTime}
              />

              <div className="flex items-center">
                <TeamOutlined className="text-base leading-none mr-2" />
                <Stepper defaultValue={recipe.portions} min={1} />
              </div>
            </div>

            <FavouriteRecipeButton recipeId={recipe.id as any} />
          </div>

          <div className="flex justify-between items-center mb-2">
            <SectionSubTitle>Składniki:</SectionSubTitle>

            <button className="text-secondary text-xs font-normal inline-flex items-center">
              <ShoppingOutlined className="text-base leading-none mr-1.5" />
              Dodaj do zakupów
            </button>
          </div>

          <ul className="list-disc list-inside text-base text-secondary pb-3 mb-4">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>
                {ingredient.name} - {ingredient.quantity} {ingredient.quantity}
              </li>
            ))}
          </ul>

          {recipe.instructions.map((step, i) => (
            <React.Fragment key={i}>
              <SectionSubTitle className="mb-2">Krok {i + 1}:</SectionSubTitle>

              <p className="text-base text-secondary mb-4">{step}</p>
            </React.Fragment>
          ))}
        </div>
      </main>
    </>
  );
}
