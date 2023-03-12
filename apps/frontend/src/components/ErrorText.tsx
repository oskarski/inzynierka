import classNames from 'classnames';
import React from 'react';

interface ErrorTextProps {
  error: Error;
  className?: string;
}

export const ErrorText = ({ error, className }: ErrorTextProps) => {
  return (
    <p className={classNames('text-red-500', className)}>{error.message}</p>
  );
};
