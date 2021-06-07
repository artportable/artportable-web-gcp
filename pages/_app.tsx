import '../styles/globals.css'
import '../styles/theme.css'
import '../styles/variables.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../app/components/Header/Header'
import React from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from '../styles/theme'

import { Provider } from 'react-redux'
import { useStore } from '../app/redux/store'
import { appWithTranslation } from 'next-i18next'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faDribbble,
  faBehanceSquare
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faDribbble,
  faBehanceSquare
);

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const isSignUp = pageProps.isSignUp === true;
  const user = store.getState()?.user;
  const isSignedIn = user?.isSignedIn ?? false;
  const username = user?.username ?? null;
  const profilePicture = user?.profilePicture ?? null; // TODO: Save profile picture in store

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            isSignUp={isSignUp}
            isSignedIn={isSignedIn}
            username={username}
            profilePicture={profilePicture}
          ></Header>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default appWithTranslation(MyApp)
