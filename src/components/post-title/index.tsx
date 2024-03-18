import classNames from 'classnames/bind';
import styles from './index.module.scss';
import type { FC } from 'react';

const cx = classNames.bind(styles);

interface PostTitleProps {
  title: string;
}

export const PostTitle: FC<PostTitleProps> = ({ title }) => (
  <h1 className={cx('container')}>{title}</h1>
);
