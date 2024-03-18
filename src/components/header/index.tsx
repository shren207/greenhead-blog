import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import styles from './index.module.scss';
import type { FC } from 'react';

const cx = classNames.bind(styles);

interface HeaderProps {
  title: string;
  location: Location;
  rootPath: string;
}

export const Header: FC<HeaderProps> = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath;
  return (
    isRoot && (
      <h1 className={cx('container')}>
        <Link to="/" className={cx('link')}>
          {title}
        </Link>
      </h1>
    )
  );
};
