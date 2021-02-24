import '../styles/globals.css'
import '../styles/theme.css'
import '../styles/variables.css'
import type { AppProps } from 'next/app'
import Header from '../app/components/Header/Header'
import React from 'react'

import { Provider } from 'react-redux'
import { useStore } from '../app/redux/store'



function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Header></Header>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
