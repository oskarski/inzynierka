import { HTMLAttributes } from 'react';
import classNames from 'classnames';

interface LinkButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const LinkButton = ({ className, ...props }: LinkButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        'text-secondary text-xs font-normal inline-flex items-center',
        className
      )}
      {...props}
    />
  );
};
