import '../styles/globals.css'
import '../styles/theme.css'
import '../styles/variables.css'
import type { AppProps } from 'next/app'
import Header from '../app/components/Header/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header></Header>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
