import Head from 'next/head';
import { env, headTitle, HttpClient } from '@fe/utils';
import { HydrateReactQueryState } from '../../server/server-react-query';
import { SignedInGuard } from '../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import React from 'react';
import { RecipeCategoryTag } from '@fe/recipes-categories';
import { Loader, SectionSubTitle, SectionTitle } from '@fe/components';
import { ShoppingOutlined, TeamOutlined } from '@ant-design/icons';
import { Stepper } from 'antd-mobile';
import {
  FavouriteRecipeButton,
  GetRecipeDetailsQueryKey,
  RecipeImage,
  RecipePreparationTime,
  RecipeRate,
  RecipesApi,
  useConnectedCategories,
  useRecipeDetails,
} from '@fe/recipes';
import { RecipeId } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async ({ params }, queryClient, user) => {
    const recipeId: RecipeId = params?.recipeId as RecipeId;

    const recipesApi = new RecipesApi(
      HttpClient.privateHttpClient(env().apiUrl, {
        accessToken: user.accessToken,
      })
    );

    await queryClient.prefetchQuery(GetRecipeDetailsQueryKey(recipeId), () =>
      recipesApi.getRecipeDetails(recipeId)
    );

    return {
      props: {
        recipeId: params?.recipeId,
      },
    };
  })
);

interface RecipesPageProps {
  recipeId: RecipeId;
}

export default function RecipesPage({ recipeId }: RecipesPageProps) {
  const getRecipeCategories = useConnectedCategories();

  const [recipe, loading, error] = useRecipeDetails(recipeId);

  const categories = recipe && getRecipeCategories(recipe);

  return (
    <>
      <Head>
        <title>{headTitle(recipe?.name)}</title>
      </Head>

      <main>
        {loading && <Loader />}

        <ApiErrorMessage size="base" error={error} />

        {recipe && (
          <>
            {/* TODO Add image to recipe */}
            {/*{dummyRecipe.imageUrl && (*/}
            {/*  <RecipeImage*/}
            {/*    imageUrl={dummyRecipe.imageUrl}*/}
            {/*    recipeName={dummyRecipe.name}*/}
            {/*    className="mb-6 -mx-4"*/}
            {/*  />*/}
            {/*)}*/}

            <div className="px-2">
              {categories && categories.length > 0 && (
                <div className="flex items-center space-x-2 mb-3">
                  {categories.map((category) => (
                    <RecipeCategoryTag key={category.id}>
                      {category.name}
                    </RecipeCategoryTag>
                  ))}
                </div>
              )}

              <SectionTitle className="mb-2" truncate={false}>
                {recipe.name}
              </SectionTitle>

              <p className="text-sm font-normal text-secondary mb-4">
                {recipe.description}
              </p>

              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center text-sm text-secondary space-x-6">
                  {/* TODO Add recipe rate */}
                  {/*<RecipeRate rate={dummyRecipe.rate} />*/}

                  <RecipePreparationTime
                    preparationTimeLabel={recipe.formattedPreparationTime}
                  />

                  <div className="flex items-center">
                    <TeamOutlined className="text-base leading-none mr-2" />
                    <Stepper defaultValue={recipe.portions} min={1} />
                  </div>
                </div>

                {/* TODO Add favourite button */}
                {/*<FavouriteRecipeButton recipeId={recipe.id as any} />*/}
              </div>

              {/* TODO Add ingredients listing */}

              {/*<div className="flex justify-between items-center mb-2">*/}
              {/*  <SectionSubTitle>Składniki:</SectionSubTitle>*/}

              {/*  /!* TODO Implement adding to shopping list *!/*/}
              {/*  /!*<button className="text-secondary text-xs font-normal inline-flex items-center">*!/*/}
              {/*  /!*  <ShoppingOutlined className="text-base leading-none mr-1.5" />*!/*/}
              {/*  /!*  Dodaj do zakupów*!/*/}
              {/*  /!*</button>*!/*/}
              {/*</div>*/}

              {/*<ul className="list-disc list-inside text-base text-secondary pb-3 mb-4">*/}
              {/*  {dummyRecipe.ingredients.map((ingredient, i) => (*/}
              {/*    <li key={i}>*/}
              {/*      {ingredient.name} - {ingredient.quantity}{' '}*/}
              {/*      {ingredient.quantity}*/}
              {/*    </li>*/}
              {/*  ))}*/}
              {/*</ul>*/}

              {recipe.instructions.map(({ step }, i) => (
                <React.Fragment key={i}>
                  <SectionSubTitle className="mb-2">
                    Krok {i + 1}:
                  </SectionSubTitle>

                  <p className="text-base text-secondary mb-4">{step}</p>
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}