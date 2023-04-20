import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { RecipeCategoryTag } from '@fe/recipes-categories';
import { ProgressCircle } from 'antd-mobile';
import classNames from 'classnames';
import { IRecipeListItem } from '../api';
import { IRecipeCategoryListItemDto } from '@lib/shared';
import { FavouriteRecipeButton } from './FavouriteRecipeButton';
import { RecipeRate } from './RecipeRate';
import { RecipePreparationTime } from './RecipePreparationTime';
import { RecipeImage } from '@fe/recipes';

interface RecipeCardProps {
  recipe: IRecipeListItem;
  categories: IRecipeCategoryListItemDto[];
  className?: string;
}

export const RecipeCard = ({
  recipe,
  categories,
  className,
}: RecipeCardProps) => {
  return (
    <div
      className={classNames('rounded-3xl overflow-hidden shadow-md', className)}
    >
      {/* TODO Add images to recipes */}
      {/*{recipe.imageUrl && <RecipeImage imageUrl={recipe.imageUrl} recipeName={recipe.name} />}*/}

      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {categories.map((category) => (
                <RecipeCategoryTag key={category.id}>
                  {category.name}
                </RecipeCategoryTag>
              ))}
            </div>

            <h3 className="text-xl text-default mb-2">{recipe.name}</h3>
          </div>

          {/* TODO Add recipe coverage to recipe */}
          {/*<div>*/}
          {/*  <ProgressCircle*/}
          {/*    className="text-xs"*/}
          {/*    percent={recipe.coverage}*/}
          {/*    style={{ '--size': '2.5rem', '--fill-color': '#00B578' }}*/}
          {/*  >*/}
          {/*    {recipe.coverage}%*/}
          {/*  </ProgressCircle>*/}
          {/*</div>*/}
        </div>

        <p className="text-sm text-secondary mb-2">{recipe.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-secondary space-x-6">
            {/* TODO Add recipe reviews */}
            {/*<RecipeRate rate={recipe.rate} />*/}

            <RecipePreparationTime
              preparationTimeLabel={recipe.formattedPreparationTime}
            />

            <div className="flex items-center">
              <TeamOutlined className="text-base leading-none mr-2" />
              {recipe.portions}
            </div>
          </div>

          {/* TODO Add favourite logic */}
          {/*<FavouriteRecipeButton recipeId={recipe.id} />*/}
        </div>
      </div>
    </div>
  );
};
