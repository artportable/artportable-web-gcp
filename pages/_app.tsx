import '../styles/messages.css'
import '../styles/globals.css'
import '../styles/theme.css'
import '../styles/variables.css'
import type { AppProps, AppContext } from 'next/app'
import App from 'next/app';
import Head from 'next/head'
import React, { useState } from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from '../styles/theme'
import { Provider } from 'react-redux'
import { useStore } from '../app/redux/store'
import { appWithTranslation } from 'next-i18next'
import { loadCSS } from 'fg-loadcss';

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faDribbble,
  faBehanceSquare
} from '@fortawesome/free-brands-svg-icons'

//keycloak 
import type { IncomingMessage } from 'http';
import { SSRKeycloakProvider } from '@react-keycloak/ssr';
import cookie from 'cookie';
import { keycloakConfig, keycloakInitOptions } from '../constants/keycloakSettings';
import { AuthClientTokens } from '@react-keycloak/core';
import { CustomSSRCookies } from '../app/utils/customSSRCookies'
import ArtportableContexts from '../app/contexts/ArtportableContexts'


library.add(
  faDribbble,
  faBehanceSquare
);

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const store = useStore(pageProps.initialReduxState);

  const [accessToken, setAccessToken] = useState<string>(null);

  const onAuthRefresh = (tokens: AuthClientTokens) => {
    setAccessToken(tokens.token);
  }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const faCSSNode = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      faCSSNode.parentNode!.removeChild(faCSSNode);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>Artportable</title>
      </Head>
      <SSRKeycloakProvider
        keycloakConfig={keycloakConfig}
        persistor={CustomSSRCookies(cookies)}
        initOptions={keycloakInitOptions}
        onTokens={onAuthRefresh}
      >
        <Provider store={store}>
          <ArtportableContexts accessToken={accessToken}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
          </ArtportableContexts>
        </Provider>
      </SSRKeycloakProvider>
    </>
  )
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context: AppContext) => {
  var pageProps = App.getInitialProps(context);
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
    pageProps: { ...pageProps }
  };
};

export default appWithTranslation(MyApp)
