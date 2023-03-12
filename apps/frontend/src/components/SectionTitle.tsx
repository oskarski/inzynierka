import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface SectionTitleProps {
  href?: string;
  className?: string;
}

export const SectionTitle = ({
  href,
  className,
  children,
}: PropsWithChildren<SectionTitleProps>) => {
  return (
    <h2
      className={classNames(
        'text-3xl font-bold text-default truncate',
        className
      )}
    >
      {href ? (
        <Link href={href} className="text-default inline-flex items-center">
          <span className="truncate">{children}</span>
          <RightOutlined className="ml-4 text-2xl leading-none inline-block" />
        </Link>
      ) : (
        children
      )}
    </h2>
  );
};
