import classNames from 'classnames/bind';
import styles from './index.module.scss';
import type { FC } from 'react';

const cx = classNames.bind(styles);

interface PostDateProps {
  date: string;
}

export const PostDate: FC<PostDateProps> = ({ date }) => {
  return <p className={cx('container')}>{date}</p>;
};
