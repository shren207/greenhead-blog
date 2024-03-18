import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import styles from './index.module.scss';
import { GitHubIcon } from '../social-share/github-icon';
import type { FC } from 'react';

const cx = classNames.bind(styles);

interface TopProps {
  title: string;
  location: Location;
  rootPath: string;
}

export const Top: FC<TopProps> = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath;

  return (
    <div className={cx('container', { isRoot })}>
      {!isRoot && (
        <Link to="/" className={cx('link')}>
          {title}
        </Link>
      )}
      <GitHubIcon />
    </div>
  );
};
