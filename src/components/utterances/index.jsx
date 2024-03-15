import { useEffect, createRef } from 'react';

import { THEME } from '../../constants';
import * as Dom from '../../utils/dom';

const src = 'https://utteranc.es/client.js';
const branch = 'master';
const DARK_THEME = 'photon-dark';
const LIGHT_THEME = 'github-light';

export const Utterances = ({ repo }) => {
  const rootElm = createRef();

  useEffect(() => {
    const isDarkTheme = Dom.hasClassOfBody(THEME.DARK);
    const utterances = document.createElement('script');
    const utterancesConfig = {
      src,
      repo,
      branch,
      theme: isDarkTheme ? DARK_THEME : LIGHT_THEME,
      label: 'comment',
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    };

    Object.keys(utterancesConfig).forEach((configKey) => {
      utterances.setAttribute(configKey, utterancesConfig[configKey]);
    });
    rootElm.current.appendChild(utterances);
  }, []);

  return <div className="utterances" ref={rootElm} />;
};
