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
  faHeart,
  faUserCircle,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faCommentAlt,
  faBell,
  faPlusCircle,
  faPlus,
  faCog,
  faStar,
  faBookmark,
  faEllipsisV,
  faSearch,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart,
  faUserCircle,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faCommentAlt,
  faBell,
  faPlusCircle,
  faPlus,
  faCog,
  faStar,
  faBookmark,
  faEllipsisV,
  faSearch,
  faEye,
  faEyeSlash
);

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const isSignUp = Component.name === 'Signup';

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
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header isSignUp={isSignUp}></Header>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default appWithTranslation(MyApp)
