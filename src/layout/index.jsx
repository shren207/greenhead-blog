import { Fragment } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ThemeSwitch } from '../components/theme-switch';
import { Top } from '../components/top';
import { rhythm } from '../utils/typography';

import './index.scss';

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(27), // 기본값은 24, Gparkkii.io의 포스트 폭은 29
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <ThemeSwitch />
        <Header title={title} location={location} rootPath={rootPath} />
        {children}
        <Footer />
      </div>
    </Fragment>
  );
};
