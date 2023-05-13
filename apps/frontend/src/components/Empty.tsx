import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface EmptyProps {
  icon?: ReactNode;
  title?: string;
  description?: ReactNode;
  cta?: ReactNode;
  className?: string;
}

export const Empty = ({
  icon,
  title,
  description,
  cta,
  className,
}: EmptyProps) => {
  return (
    <div className={classNames('text-center text-secondary px-4', className)}>
      {icon && <div className="text-6xl mb-6">{icon}</div>}

      {title && <h3 className="text-3xl mb-2">{title}</h3>}

      {description && <p className="mb-6">{description}</p>}

      {cta}
    </div>
  );
};
