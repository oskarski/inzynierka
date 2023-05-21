import { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface LinkButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
}

export const LinkButton = ({
  className,
  variant = 'default',
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
    />
  );
};
