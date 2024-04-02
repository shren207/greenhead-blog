import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const CustomH1 = (props: any) => <h2 className={cx('customH1')} {...props} />;
const Introduction = (props: any) => (
  <div className={cx('introduction')} {...props} />
);
const h1 = (props: any) => <h2 className={cx('h1')} {...props} />;
const h2 = (props: any) => <h2 className={cx('h2')} {...props} />;
const h3 = (props: any) => <h3 className={cx('h3')} {...props} />;
const p = (props: any) => <p className={cx('p')} {...props} />;
const ul = (props: any) => <ul className={cx('ul')} {...props} />;
const li = (props: any) => <li className={cx('li')} {...props} />;
const b = (props: any) => <b className={cx('b')} {...props} />;

export default { CustomH1, Introduction, h1, h2, h3, p, ul, li, b };
