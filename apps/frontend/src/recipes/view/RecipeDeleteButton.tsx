import { Button, Dialog } from 'antd-mobile';
import React from 'react';
import { useDeleteRecipe } from '../api';
import { RecipeId } from '@lib/shared';
import { routes, useRouting } from '@fe/utils';

interface RecipeDeleteButtonProps {
  recipeId: RecipeId;
}

export const RecipeDeleteButton = ({ recipeId }: RecipeDeleteButtonProps) => {
  const { redirectTo } = useRouting();

  const [, , , { mutateAsync: deleteRecipe }] = useDeleteRecipe(recipeId, {
    onSuccess: () => redirectTo(routes.yourRecipes()),
  });

  return (
    <Button
      fill="outline"
      color="danger"
      size="small"
      onClick={() =>
        Dialog.confirm({
          content: <>Czy na pewno chcesz usunąć ten przepis?</>,
          confirmText: 'Potwierdź',
          cancelText: 'Anuluj',
          onConfirm: () => deleteRecipe().catch(() => {}),
        })
      }
    >
      Usuń
    </Button>
  );
};
