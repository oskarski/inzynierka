import { Tag } from 'antd-mobile';
import React, { PropsWithChildren } from 'react';

interface RecipeCategoryTagProps {}

export const RecipeCategoryTag = ({
  children,
}: PropsWithChildren<RecipeCategoryTagProps>) => {
  return (
    <Tag
      color="#FEF9C3"
      style={{
        '--text-color': '#CA8A04',
      }}
    >
      {children}
    </Tag>
  );
};
