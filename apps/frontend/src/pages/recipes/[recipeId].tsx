import Head from 'next/head';
import { env, headTitle, HttpClient, routes } from '@fe/utils';
import { HydrateReactQueryState } from '../../server/server-react-query';
import { SignedInGuard } from '../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import React, { useState } from 'react';
import {
  ListAllRecipesCategoriesQueryKey,
  RecipeCategoryTag,
  RecipesCategoriesApi,
} from '@fe/recipes-categories';
import { Loader, SectionSubTitle, SectionTitle } from '@fe/components';
import { ShoppingOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Stepper } from 'antd-mobile';
import {
  FavouriteRecipeButton,
  GetRecipeDetailsQueryKey,
  RecipeCookingModeModalButton,
  RecipeImage,
  RecipePreparationTime,
  RecipeRate,
  RecipesApi,
  useConnectedCategories,
  useRecipeDetails,
  RecipeStateTag,
  FavouriteRecipesApi,
  ListFavouriteRecipesQueryKey,
} from '@fe/recipes';
import { RecipeId } from '@lib/shared';
import { ApiErrorMessage } from '@fe/errors';
import { useSignedInUser } from '@fe/iam';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard(async ({ params }, queryClient, user) => {
    const recipeId: RecipeId = params?.recipeId as RecipeId;

    const httpClient = HttpClient.privateHttpClient(env().apiUrl, {
      accessToken: user.accessToken,
    });

    const recipesApi = new RecipesApi(httpClient);
    const recipesCategoriesApi = new RecipesCategoriesApi(httpClient);
    const favouriteRecipesApi = new FavouriteRecipesApi(httpClient);

    await queryClient.prefetchQuery(GetRecipeDetailsQueryKey(recipeId), () =>
      recipesApi.getRecipeDetails(recipeId)
    );
    await queryClient.prefetchQuery(ListAllRecipesCategoriesQueryKey, () =>
      recipesCategoriesApi.listCategories({})
    );
    await queryClient.prefetchQuery(ListFavouriteRecipesQueryKey, () =>
      favouriteRecipesApi.listFavouriteRecipes()
    );

    return {
      props: {
        recipeId,
      },
    };
  })
);

interface RecipeDetailsPageProps {
  recipeId: RecipeId;
}

export default function RecipeDetailsPage({
  recipeId,
}: RecipeDetailsPageProps) {
  const getRecipeCategories = useConnectedCategories();

  const [currentUser] = useSignedInUser();
  const [recipe, loading, error] = useRecipeDetails(recipeId);

  const categories = recipe && getRecipeCategories(recipe);

  const [portionsProportion, setPortionsProportion] = useState(1);

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

            <div className="pb-12">
              {((categories && categories.length > 0) ||
                recipe.isAuthoredBy(currentUser?.id)) && (
                <div className="flex items-center space-x-2 mb-3">
                  {recipe.isAuthoredBy(currentUser?.id) && (
                    <RecipeStateTag recipeState={recipe.state} />
                  )}

                  {categories &&
                    categories.map((category) => (
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
                    <Stepper
                      defaultValue={recipe.portions}
                      min={1}
                      onChange={(portions) =>
                        setPortionsProportion(portions / recipe.portions)
                      }
                    />
                  </div>
                </div>

                <FavouriteRecipeButton recipeId={recipe.id} />
              </div>

              <div className="flex justify-between items-center mb-2">
                <SectionSubTitle>Składniki:</SectionSubTitle>

                {/*  /!* TODO Implement adding to shopping list *!/*/}
                {/*  /!*<button className="text-secondary text-xs font-normal inline-flex items-center">*!/*/}
                {/*  /!*  <ShoppingOutlined className="text-base leading-none mr-1.5" />*!/*/}
                {/*  /!*  Dodaj do zakupów*!/*/}
                {/*  /!*</button>*!/*/}
              </div>

              <ul className="list-disc list-inside text-base text-secondary pb-3 mb-4">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.name} -{' '}
                    {+(ingredient.quantity * portionsProportion).toFixed(2)}{' '}
                    {ingredient.unit}
                  </li>
                ))}
              </ul>

              {recipe.instructions.map(({ step }, i) => (
                <React.Fragment key={i}>
                  <SectionSubTitle className="mb-2">
                    Krok {i + 1}:
                  </SectionSubTitle>

                  <p className="text-base text-secondary mb-4">{step}</p>
                </React.Fragment>
              ))}
            </div>

            <div className="fixed z-10 bottom-20 left-4 right-4 space-y-3">
              <RecipeCookingModeModalButton
                recipe={recipe}
                portionsProportion={portionsProportion}
              />

              {recipe.isAuthoredBy(currentUser?.id) && (
                <Link
                  href={routes.editRecipe(recipeId)}
                  className="block bg-white"
                >
                  <Button block={true} color="primary" fill="outline">
                    Edytuj
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
