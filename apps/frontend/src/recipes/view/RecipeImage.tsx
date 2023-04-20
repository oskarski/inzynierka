import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

interface RecipeImageProps {
  imageUrl: string;
  recipeName: string;
  className?: string;
}

export const RecipeImage = ({
  imageUrl,
  recipeName,
  className,
}: RecipeImageProps) => {
  return (
    <div className={classNames('relative aspect-image', className)}>
      <Image src={imageUrl} alt={`${recipeName} - Zdjęcie`} fill={true} />
    </div>
  );
};
