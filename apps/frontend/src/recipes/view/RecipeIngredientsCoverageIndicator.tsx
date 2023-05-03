import { ProgressCircle } from 'antd-mobile';
import React from 'react';

interface RecipeIngredientsCoverageIndicatorProps {
  percentageCoverage: number;
}

const getColor = (percentageCoverage: number) => {
  if (percentageCoverage < 30) return 'var(--adm-color-danger)';
  if (percentageCoverage < 60) return 'var(--adm-color-warning)';

  return 'var(--adm-color-success)';
};

export const RecipeIngredientsCoverageIndicator = ({
  percentageCoverage,
}: RecipeIngredientsCoverageIndicatorProps) => {
  return (
    <ProgressCircle
      className="text-xs text-default"
      percent={percentageCoverage}
      style={{
        '--size': '2.5rem',
        '--fill-color': getColor(percentageCoverage),
      }}
    >
      {percentageCoverage}%
    </ProgressCircle>
  );
};
