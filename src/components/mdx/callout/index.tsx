import classNames from 'classnames/bind';
import styles from './index.module.scss';
import type { FC, ReactNode } from 'react';

const cx = classNames.bind(styles);

interface CalloutProps {
  variant: 'note' | 'tip' | 'info' | 'warning';
  children: ReactNode;
}

export const Callout: FC<CalloutProps> = ({ variant = 'note', children }) => {
  return (
    <div className={cx({ container: true, [variant]: true })}>{children}</div>
  );
};
