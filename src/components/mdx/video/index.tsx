import classNames from 'classnames/bind';
import styles from './index.module.scss';
import type { FC } from 'react';

const cx = classNames.bind(styles);

interface VideoProps {
  videoSrcURL: string;
}

export const Video: FC<VideoProps> = ({ videoSrcURL }) => (
  <video width="50%" height="auto" controls className={cx('container')}>
    <source src={videoSrcURL} type="video/mp4" />
  </video>
);
