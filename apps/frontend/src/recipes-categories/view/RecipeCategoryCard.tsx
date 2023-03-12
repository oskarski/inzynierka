import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface RecipeCategoryCardProps {
  className?: string;
}

export const RecipeCategoryCard = ({ className }: RecipeCategoryCardProps) => {
  const category = { name: 'Kuchnia włoska' };

  return (
    <Link
      href="/recipes"
      className={classNames(
        'flex rounded-3xl overflow-hidden shadow-md aspect-image items-center justify-center relative',
        className
      )}
    >
      <div className="bg-black opacity-55 w-full h-full absolute inset-0" />

      <h3 className="text-xl font-medium text-white relative">
        {category.name}
      </h3>
    </Link>
  );
};
