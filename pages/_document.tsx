import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import React from 'react';
import { GA_TRACKING_ID } from '../lib/gtag'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      });
    
    const initialProps = await Document.getInitialProps(ctx);

    return { 
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>
      ]
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
          async
          src={'https://www.googletagmanager.com/gtag/js?id=[GA_TRACKING_ID]'}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '[GA_TRACKING_ID]', { 
                page_path: window.location.pathname });
            `,
          }}
        />
          <link
            rel="preload"
            href="/fonts/GT-America-Standard-Regular.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/GT-America-Standard-Medium.woff2"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument