import classNames from 'classnames/bind';
import styles from './index.module.scss';
import type { FC } from 'react';

const cx = classNames.bind(styles);

interface ImageProps {
  imageSrcURL: string;
}

export const Image: FC<ImageProps> = ({ imageSrcURL, ...props }) => (
  <img src={imageSrcURL} className={cx('container')} {...props} />
);
