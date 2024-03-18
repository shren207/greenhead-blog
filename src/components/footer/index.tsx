import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export const Footer = () => (
  <footer className={cx('container')}>
    ©<a href="https://github.com/shren207">Greenhead</a>, Built with{' '}
    <a href="https://github.com/JaeYeopHan/gatsby-starter-bee">
      Gatsby-starter-bee
    </a>
  </footer>
);
