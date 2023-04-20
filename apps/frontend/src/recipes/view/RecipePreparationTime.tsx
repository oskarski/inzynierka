import { ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';

interface RecipePreparationTimeProps {
  preparationTimeLabel: string;
}

export const RecipePreparationTime = ({
  preparationTimeLabel,
}: RecipePreparationTimeProps) => {
  return (
    <div className="flex items-center">
      <ClockCircleOutlined className="text-base leading-none mr-2" />
      {preparationTimeLabel}
    </div>
  );
};
