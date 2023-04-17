import React from 'react';
import Image from 'next/image';
import {
  ClockCircleOutlined,
  HeartOutlined,
  HeartFilled,
  StarFilled,
  TeamOutlined,
} from '@ant-design/icons';
import { RecipeCategoryTag } from '@fe/recipes-categories';
import { ProgressCircle } from 'antd-mobile';
import classNames from 'classnames';
import { IRecipeListItem } from '../api';
import { IRecipeCategoryListItemDto } from '@lib/shared';

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
  // TODO Make it a prop -> Leaving it until all the data comes from API
  const dummyRecipe = {
    id: '1',
    name: 'Pizza margherita',
    description:
      'Królowa gatunku, czyli margherita, zachwyca prostotą składników, w których kryje się potęga smaku.',
    imageUrl: 'http://via.placeholder.com/396x226',
    review: 4.7,
    preparationTime: 25,
    portions: 8,
    coverage: 87,
    categories: [
      {
        id: 1,
        name: 'Kuchnia włoska',
        darkColor: '#CA8A04',
        lightColor: '#FEF9C3',
      },
      {
        id: 2,
        name: 'Wegetariańskie',
        darkColor: '#16A34A',
        lightColor: '#DCFCE7',
      },
    ],
  };
  const favourites = ['12'];

  return (
    <div
      className={classNames('rounded-3xl overflow-hidden shadow-md', className)}
    >
      {/* TODO Add images to recipes */}
      {/*{recipe.imageUrl && (*/}
      {/*  <div className="relative aspect-image">*/}
      {/*    <Image*/}
      {/*      src={recipe.imageUrl}*/}
      {/*      alt={`${recipe.name} - Zdjęcie`}*/}
      {/*      fill={true}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}

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
            {/*<div className="flex items-center">*/}
            {/*  <StarFilled className="text-base leading-none text-yellow-400 mr-2" />*/}
            {/*  {recipe.review}*/}
            {/*</div>*/}

            <div className="flex items-center">
              <ClockCircleOutlined className="text-base leading-none mr-2" />
              {recipe.formattedPreparationTime}
            </div>

            <div className="flex items-center">
              <TeamOutlined className="text-base leading-none mr-2" />
              {recipe.portions}
            </div>
          </div>

          {/* TODO Add favourite logic */}
          {/*{favourites.includes(recipe.id) ? (*/}
          {/*  <button className="text-2xl leading-none text-red-500">*/}
          {/*    <HeartFilled />*/}
          {/*  </button>*/}
          {/*) : (*/}
          {/*  <button className="text-2xl leading-none text-red-500">*/}
          {/*    <HeartOutlined />*/}
          {/*  </button>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};
