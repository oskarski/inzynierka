import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { routes } from '@fe/utils';
import { CategoryType, IRecipeCategoryListItemDto } from '@lib/shared';
import { useRecipesFilters } from '@fe/recipes';

interface RecipeCategoryCardProps {
  recipeCategory: IRecipeCategoryListItemDto;
  className?: string;
}

export const RecipeCategoryCard = ({
  recipeCategory,
  className,
}: RecipeCategoryCardProps) => {
  const {
    selectDishTypeFilter,
    clearDishTypeFilter,
    selectCuisineTypeFilter,
    clearCuisineTypeFilter,
    selectDietTypeFilter,
    clearDietTypeFilter,
    selectOtherCategoryFilter,
    clearOtherCategoryFilter,
  } = useRecipesFilters();

  return (
    <Link
      href={routes.recipes()}
      onClick={() => {
        clearDishTypeFilter();
        clearCuisineTypeFilter();
        clearDietTypeFilter();
        clearOtherCategoryFilter();

        if (recipeCategory.type === CategoryType.DishType)
          selectDishTypeFilter(recipeCategory.id);
        else if (recipeCategory.type === CategoryType.CuisineType)
          selectCuisineTypeFilter(recipeCategory.id);
        else if (recipeCategory.type === CategoryType.DietType)
          selectDietTypeFilter(recipeCategory.id);
        else selectOtherCategoryFilter(recipeCategory.id);
      }}
      className={classNames(
        'flex rounded-3xl overflow-hidden shadow-md aspect-image items-center justify-center relative',
        className
      )}
    >
      <div className="bg-black opacity-55 w-full h-full absolute inset-0" />

      <h3 className="text-xl font-medium text-white relative">
        {recipeCategory.name}
      </h3>
    </Link>
  );
};
