import { FrownOutlined } from '@ant-design/icons';
import React from 'react';
import { routes } from '@fe/utils';
import { Button } from 'antd-mobile';
import Link from 'next/link';
import { Empty } from '@fe/components';

interface EmptyFavouriteRecipesListProps {
  className?: string;
}

export const EmptyFavouriteRecipesList = ({
  className,
}: EmptyFavouriteRecipesListProps) => {
  return (
    <Empty
      className={className}
      icon={<FrownOutlined />}
      title="Hmm ..."
      description={
        <>
          Wygląda na to, że Twoje perfekcyjne danie wciąż przed Tobą.
          <br />
          <br />
          Nic straconego, pomożemy Ci je znaleźć!
        </>
      }
      cta={
        <Link href={routes.recipes()}>
          <Button color="primary" fill="outline">
            Znajdź idealny przepis!
          </Button>
        </Link>
      }
    />
  );
};
