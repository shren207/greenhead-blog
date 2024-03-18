import { Fragment } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ThemeSwitch } from '../components/theme-switch';
import { Top } from '../components/top';

import './index.scss';

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  return (
    <Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      <div className="layout-container">
        <ThemeSwitch />
        <Header title={title} location={location} rootPath={rootPath} />
        {children}
        <Footer />
      </div>
    </Fragment>
  );
};
