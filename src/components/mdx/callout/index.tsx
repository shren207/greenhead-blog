import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface CalloutProps {
  variant: 'note' | 'tip' | 'info' | 'warning';
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = 'note',
  children,
}) => {
  return (
    <div className={cx({ container: true, [variant]: true })}>{children}</div>
  );
};
