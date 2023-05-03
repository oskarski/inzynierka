import { Button } from 'antd-mobile';
import Link from 'next/link';
import React from 'react';
import { routes } from '@fe/utils';

export const EmptyMyRecipesList = () => {
  return (
    <div className="text-center">
      <p className="text-secondary mb-6">
        Wygląda na to, że nie masz dodałeś jeszcze żadnego swojego przepisu.
      </p>

      <Link href={routes.createRecipe()}>
        <Button color="primary" fill="outline">
          Dodaj swój pierwszy przepis!
        </Button>
      </Link>
    </div>
  );
};
