import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface ScrollableRowProps {
  className?: string;
}

export const ScrollableRow = ({
  className,
  children,
}: PropsWithChildren<ScrollableRowProps>) => {
  return (
    <div className={classNames('flex overflow-x-auto', className)}>
      {children}
    </div>
  );
};
