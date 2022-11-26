import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "@utility/createEmotionCache";

import DEFAULT_SEO from "@utility/next-seo.config";

import { profileImage } from "@res/data";
export default class MyDocument extends Document {
  render() {
    const { title, description, og, additionalLinkTags, theme_color } =
      DEFAULT_SEO;
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css?family=Mali:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Mali:300,400,500,700&display=swap"
          />
          <link rel="preload" as="image" href={`${profileImage}.png`} />
          <link rel="preload" as="image" href={`${profileImage}.jpg`} />
          <link rel="preload" as="image" href={`${profileImage}.webp`} />
          <meta name="description" content={description} />
          <meta name="theme-color" content={theme_color} />
          <meta property="og:title" content={og.title} />
          <meta property="og:description" content={og.description} />
          <meta property="og:url" content={og.url} />
          <meta property="og:type" content={og.type} />
          <meta name="application-name" content={title} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={title} />
          <meta name="description" content={description} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content={theme_color} />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="shortcut icon" href="/favicon.ico" />

          <link
            rel={additionalLinkTags[0].rel}
            href={additionalLinkTags[0].href}
          />
          <link
            rel={additionalLinkTags[1].rel}
            href={additionalLinkTags[1].href}
          />
          <link
            rel={additionalLinkTags[2].rel}
            href={additionalLinkTags[2].href}
            sizes={additionalLinkTags[2].sizes}
          />
          <link
            rel={additionalLinkTags[3].rel}
            href={additionalLinkTags[3].href}
            sizes={additionalLinkTags[3].sizes}
          />
          <link
            rel={additionalLinkTags[4].rel}
            href={additionalLinkTags[4].href}
            sizes={additionalLinkTags[4].sizes}
          />
          <link
            rel={additionalLinkTags[5].rel}
            href={additionalLinkTags[5].href}
            sizes={additionalLinkTags[5].sizes}
          />
          <link
            rel={additionalLinkTags[6].rel}
            href={additionalLinkTags[6].href}
            sizes={additionalLinkTags[6].sizes}
          />
          <link
            rel={additionalLinkTags[7].rel}
            href={additionalLinkTags[7].href}
            sizes={additionalLinkTags[7].sizes}
          />
          <link
            rel={additionalLinkTags[8].rel}
            href={additionalLinkTags[8].href}
            sizes={additionalLinkTags[8].sizes}
          />
          <link
            rel={additionalLinkTags[9].rel}
            href={additionalLinkTags[9].href}
            sizes={additionalLinkTags[9].sizes}
          />
          <link
            rel={additionalLinkTags[10].rel}
            href={additionalLinkTags[10].href}
          />
          <script async type="text/javascript" src="/js/newrelic.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === "production" && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />
          )}
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
