import { StarFilled } from '@ant-design/icons';
import React from 'react';

interface RecipeRateAverageProps {
  rate?: number | null;
}

export const RecipeRateAverage = ({ rate }: RecipeRateAverageProps) => {
  if (rate === undefined || rate === null) return null;

  return (
    <div className="inline-flex items-center">
      <StarFilled className="text-base leading-none text-yellow-400 mr-2" />
      {rate}
    </div>
  );
};
