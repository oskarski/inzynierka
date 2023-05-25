import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { RecipeCategoryTag } from '@fe/recipes-categories';
import Link from 'next/link';
import classNames from 'classnames';
import { IRecipeListItem } from '../api';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { FavouriteRecipeButton } from './FavouriteRecipeButton';
import { RecipeRateAverage } from '@fe/reviews';
import { RecipePreparationTime } from './RecipePreparationTime';
import { RecipeImage } from '@fe/recipes';
import { routes } from '@fe/utils';
import { RecipeIngredientsCoverageIndicator } from './RecipeIngredientsCoverageIndicator';
import { RecipeStateTag } from './RecipeStateTag';

interface RecipeCardProps {
  recipe: IRecipeListItem;
  categories: IRecipeCategoryListItemDto[];
  showStateBadge?: boolean;
  className?: string;
}

export const RecipeCard = ({
  recipe,
  categories,
  showStateBadge,
  className,
}: RecipeCardProps) => {
  return (
    <Link
      href={routes.recipeDetails(recipe.id)}
      className={classNames(
        'block rounded-3xl overflow-hidden shadow-md min-w-70 sm:min-w-0',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {recipe.coverImage && (
          <RecipeImage imageUrl={recipe.coverImage} recipeName={recipe.name} />
        )}

        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center flex-wrap px-1 -mx-1 mb-2">
                  {showStateBadge && (
                    <div className="px-1 mb-2 flex">
                      <RecipeStateTag recipeState={recipe.state} />
                    </div>
                  )}

                  {categories.map((category) => (
                    <div key={category.id} className="px-1 mb-2 flex">
                      <RecipeCategoryTag>{category.name}</RecipeCategoryTag>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl text-default mb-2">{recipe.name}</h3>
              </div>

              {recipe.ingredientsPercentageCoverage !== undefined && (
                <div>
                  <RecipeIngredientsCoverageIndicator
                    percentageCoverage={recipe.ingredientsPercentageCoverage}
                  />
                </div>
              )}
            </div>

            <p className="text-sm text-secondary mb-2">{recipe.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-secondary space-x-6">
              <RecipeRateAverage rate={recipe.review} />

              <RecipePreparationTime
                preparationTimeLabel={recipe.formattedPreparationTime}
              />

              <div className="flex items-center">
                <TeamOutlined className="text-base leading-none mr-2" />
                {recipe.portions}
              </div>
            </div>

            <FavouriteRecipeButton recipeId={recipe.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};
