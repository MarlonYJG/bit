import React from 'react';

export type Assets = Partial<{
  js: string[];
  css: string[];
  state: string;
}>;

interface HtmlProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
  title: string;
  withDevTools?: boolean;
  assets?: Assets;
}

export function Html({ title, assets = {}, withDevTools = false, children, ...rest }: HtmlProps) {
  return (
    <html lang="en" {...rest}>
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <script>
          {/* // Allow to use react dev-tools inside the examples */}
          {withDevTools
            ? 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;'
            : null}
        </script>

        {assets.css?.map((x, idx) => (
          <link key={idx} href={x} rel="stylesheet" type="text/css" />
        ))}
      </head>
      <body>
        <div>YOU ARE SERVER-SIDED</div>
        {assets.state && (
          <script id="gql-cache" type="application/json" dangerouslySetInnerHTML={{ __html: assets.state }} />
        )}
        <div id="root">{children}</div>
        {/* load scripts after showing the the whole html  */}
        {assets.js?.map((x, idx) => (
          <script key={idx} src={x} />
        ))}
      </body>
    </html>
  );
}