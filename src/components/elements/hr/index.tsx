import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export const Hr = () => <hr className={cx('container')} />;
