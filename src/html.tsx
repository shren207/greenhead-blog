import type { FC } from 'react';

interface HTMLProps {
  htmlAttributes: object;
  headComponents: Array<any>;
  bodyAttributes: object;
  preBodyComponents: Array<any>;
  body: string;
  postBodyComponents: Array<any>;
}

const HTML: FC<HTMLProps> = (props) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
