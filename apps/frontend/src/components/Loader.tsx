import { DotLoading } from 'antd-mobile';
import classNames from 'classnames';

interface LoaderProps {
  className?: string;
  size?: 'lg' | 'sm';
}

export const Loader = ({ className, size = 'lg' }: LoaderProps) => {
  return (
    <div
      className={classNames(
        'text-center',
        {
          'text-2xl': size == 'lg',
          'text-xs': size == 'sm',
        },
        className
      )}
    >
      <DotLoading color="primary" />
    </div>
  );
};
