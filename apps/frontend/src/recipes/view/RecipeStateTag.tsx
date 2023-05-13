import { Tag } from 'antd-mobile';
import React from 'react';
import { RecipeState } from '@lib/shared';

interface RecipeStateTagProps {
  recipeState: RecipeState;
}

const recipeStateNames: Record<RecipeState, string> = {
  [RecipeState.draft]: 'Szkic',
  [RecipeState.published]: 'Opublikowany',
};
const recipeStateBackgrounds: Record<RecipeState, string> = {
  [RecipeState.draft]: '#f3f4f6',
  [RecipeState.published]: '#dcfce7',
};
const recipeStateColors: Record<RecipeState, string> = {
  [RecipeState.draft]: '#4b5563',
  [RecipeState.published]: '#16a34a',
};

export const RecipeStateTag = ({ recipeState }: RecipeStateTagProps) => {
  return (
    <Tag
      color={recipeStateBackgrounds[recipeState]}
      style={{
        '--text-color': recipeStateColors[recipeState],
      }}
    >
      {recipeStateNames[recipeState]}
    </Tag>
  );
};
