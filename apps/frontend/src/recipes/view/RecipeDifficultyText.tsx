import { RecipeDifficulty } from '@lib/shared';

interface RecipeDifficultyTextProps {
  difficulty: RecipeDifficulty;
}

const namesMap: Record<RecipeDifficulty, string> = {
  [RecipeDifficulty.easy]: 'Łatwe',
  [RecipeDifficulty.medium]: 'Średnie',
  [RecipeDifficulty.difficult]: 'Trudne',
};

export const RecipeDifficultyText = ({
  difficulty,
}: RecipeDifficultyTextProps) => {
  return <>{namesMap[difficulty]}</>;
};
