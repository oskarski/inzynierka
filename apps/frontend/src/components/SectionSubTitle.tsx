import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface SectionSubTitleProps {
  className?: string;
}

export const SectionSubTitle = ({
  className,
  children,
}: PropsWithChildren<SectionSubTitleProps>) => {
  return (
    <h3 className={classNames('text-xl text-default font-medium', className)}>
      {children}
    </h3>
  );
};
