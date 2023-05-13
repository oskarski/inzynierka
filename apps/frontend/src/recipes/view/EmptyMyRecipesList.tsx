import { Button } from 'antd-mobile';
import Link from 'next/link';
import React from 'react';
import { routes } from '@fe/utils';
import { Empty } from '@fe/components';
import { FrownOutlined } from '@ant-design/icons';

interface EmptyMyRecipesListProps {
  className?: string;
}

export const EmptyMyRecipesList = ({ className }: EmptyMyRecipesListProps) => {
  return (
    <Empty
      className={className}
      icon={<FrownOutlined />}
      title="Ach ..."
      description={
        <>
          Mamy już prawie wszystkie przepisy, ale brakuje nam jeszcze Twojego.
          <br />
          <br />
          Podziel się z nami swoim ulubionym przepisem!
        </>
      }
      cta={
        <Link href={routes.createRecipe()}>
          <Button color="primary" fill="outline">
            Dodaj swój pierwszy przepis!
          </Button>
        </Link>
      }
    />
  );
};
