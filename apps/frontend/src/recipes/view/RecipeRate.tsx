import { Rate } from 'antd-mobile';
import React from 'react';

interface RecipeRateProps {
  rate?: number;
}

export const RecipeRate = ({ rate }: RecipeRateProps) => {
  return (
    <Rate
      defaultValue={rate}
      onChange={(value) => {
        // TODO Call API to upsert review
      }}
    />
  );
};
