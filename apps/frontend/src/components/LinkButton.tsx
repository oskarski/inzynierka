import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Loader } from '@fe/components/Loader';

interface LinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  loading?: boolean;
}

export const LinkButton = ({
  className,
  variant = 'default',
  loading,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        'text-xs font-normal inline-flex items-center',
        {
          'text-secondary': variant === 'default',
          'text-primary': variant === 'primary',
        },
        className
      )}
      {...props}
      disabled={loading}
    >
      {loading && <Loader size="sm" className="mr-1" />}
      {children}
    </button>
  );
};
