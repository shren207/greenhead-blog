import { Fragment } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { ThemeSwitch } from '../components/theme-switch';
import { Top } from '../components/top';
import type { ReactNode, FC } from 'react';

import './index.scss';

interface LayoutProps {
  location: Location;
  title: string;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ location, title, children }) => {
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
