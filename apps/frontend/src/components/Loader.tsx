import { DotLoading } from 'antd-mobile';
import classNames from 'classnames';

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={classNames('text-center', className)}>
      <DotLoading className="text-2xl" color="primary" />
    </div>
  );
};
