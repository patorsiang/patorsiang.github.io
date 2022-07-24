import * as React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { MainBackground } from "@components/mainBackground";
import { CookiesProvider } from "react-cookie";

import "@fontsource/mali/300.css";
import "@fontsource/mali/400.css";
import "@fontsource/mali/500.css";
import "@fontsource/mali/700.css";

import createEmotionCache from "@utility/createEmotionCache";

import lightThemeOptions from "@styles/theme/lightThemeOptions";
import DEFAULT_SEO from "@utility/next-seo.config";

import "@styles/globals.css";

import Header from "@components/header";
import Footer from "@components/footer";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { title } = DEFAULT_SEO;
  const router = useRouter();

  return (
    <CookiesProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <>
            <CssBaseline />
            <title>{title}</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <Header />
            {/* <MainBackground hidden={router.pathname !== "/"}> */}
            <MainBackground>
              <Component {...pageProps} />
            </MainBackground>
            <Footer />
          </>
        </ThemeProvider>
      </CacheProvider>
    </CookiesProvider>
  );
};

export default MyApp;
