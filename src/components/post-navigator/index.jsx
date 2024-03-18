import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export const PostNavigator = ({ pageContext }) => {
  const { previous, next } = pageContext;

  return (
    <ul className={cx('container')}>
      <li>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
      </li>
      <li>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </li>
    </ul>
  );
};
