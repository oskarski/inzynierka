import { StarFilled } from '@ant-design/icons';
import React from 'react';

interface RecipeRateProps {
  rate?: number;
}

export const RecipeRate = ({ rate }: RecipeRateProps) => {
  if (rate === undefined) return null;

  return (
    <div className="inline-flex items-center">
      <StarFilled className="text-base leading-none text-yellow-400 mr-2" />
      {rate}
    </div>
  );
};
