import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import type { ReactNode, FC } from 'react';

const cx = classNames.bind(styles);

interface ThumbnailContainerProps {
  children: ReactNode;
}

export const ThumbnailContainer: FC<ThumbnailContainerProps> = memo(
  ({ children }) => <div className={cx('container')}>{children}</div>
);
