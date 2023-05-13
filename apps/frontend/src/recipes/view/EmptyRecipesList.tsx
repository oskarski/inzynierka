import { FrownOutlined } from '@ant-design/icons';
import React from 'react';
import { routes } from '@fe/utils';
import { Button } from 'antd-mobile';
import Link from 'next/link';
import { Empty } from '@fe/components';

interface EmptyRecipesListProps {
  className?: string;
}

export const EmptyRecipesList = ({ className }: EmptyRecipesListProps) => {
  return (
    <Empty
      className={className}
      icon={<FrownOutlined />}
      title="Oho!"
      description={
        <>
          Poszukiwane przez Ciebie danie jest tak ekskluzywne, że nawet nasza
          aplikacja jeszcze nie zna jego sekretów.
          <br />
          <br />
          Może to znak, że czas wziąć sprawy w swoje ręce i stworzyć coś
          własnego?
        </>
      }
      cta={
        <Link href={routes.createRecipe()}>
          <Button color="primary" fill="outline">
            Dodaj swój przepis!
          </Button>
        </Link>
      }
    />
  );
};
