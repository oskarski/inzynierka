import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { routes } from '@fe/utils';
import { IRecipeCategoryListItemDto } from '@lib/shared';

interface RecipeCategoryCardProps {
  recipeCategory: IRecipeCategoryListItemDto;
  className?: string;
}

export const RecipeCategoryCard = ({
  recipeCategory,
  className,
}: RecipeCategoryCardProps) => {
  return (
    <Link
      href={routes.recipes()}
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
