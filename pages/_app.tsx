import "../styles/messages.css";
import "../styles/globals.css";
import "../styles/theme.css";
import "../styles/variables.css";
import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import CookieConsentBar from "../app/components/CookieConsentBar/CookieConsentBar";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { theme } from "../styles/theme";
import { Provider } from "react-redux";
import { useStore } from "../app/redux/store";
import { appWithTranslation } from "next-i18next";
import { loadCSS } from "fg-loadcss";
import * as gtag from "../lib/gtag";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDribbble,
  faBehanceSquare,
} from "@fortawesome/free-brands-svg-icons";
//keycloak
import type { IncomingMessage } from "http";
import { SSRKeycloakProvider } from "@react-keycloak/ssr";
import cookie from "cookie";
import {
  keycloakConfig,
  keycloakInitOptions,
} from "../constants/keycloakSettings";
import {
  AuthClientError,
  AuthClientEvent,
  AuthClientTokens,
} from "@react-keycloak/core";
import { CustomSSRCookies } from "../app/utils/customSSRCookies";
import ArtportableContexts from "../app/contexts/ArtportableContexts";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { getCurrentLanguage } from "../constants/keycloakSettings";
import GlobalComponents from "../app/components/GlobalComponents/GlobalComponents";
library.add(faDribbble, faBehanceSquare);
interface InitialProps {
  cookies: unknown;
}
function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const store = useStore(pageProps.initialReduxState);
  const [accessToken, setAccessToken] = useState<string>(null);
  const [keycloakState, setKeycloakState] = useState<AuthClientEvent>();
  const onAuthRefresh = (tokens: AuthClientTokens) => {
    setAccessToken(tokens.token);
  };
  const onKeycloakEvent = (event: AuthClientEvent, error?: AuthClientError) => {
    if (event === "onAuthRefreshError" || event === "onAuthLogout") {
      !!error && console.log(error);
      Router.reload();
    } else if (
      event === "onAuthError" &&
      error &&
      error.error === "login_required"
    ) {
      // Redirect to the index page if the user is not logged in
      router.push("/");
    } else if (event === "onAuthSuccess") {
      // Redirect to the feed page if the user is logged in
      if (
        router.asPath === "/" ||
        router.asPath === "/en" ||
        router.asPath === "/sv" ||
        router.asPath === "/nb"
      ) {
        router.push("/" + getCurrentLanguage());
      }
    }

    setKeycloakState(event);
  };
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const faCSSNode = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    return () => {
      faCSSNode.parentNode!.removeChild(faCSSNode);
    };
  }, []);
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1559025668316759");
        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);
  const { t } = useTranslation(["header"]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="google-site-verification"
          content="B9E_ukZ1WdJdKTaGYuinQ8eZZdSGH3tuC4mBVIogcwc"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Joan&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="/favicon.ico" />
        <title>{t("title")}</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T287CJCK');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '331292174363133');
        fbq('track', 'PageView');
      `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=331292174363133&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
      <SSRKeycloakProvider
        keycloakConfig={keycloakConfig}
        persistor={CustomSSRCookies(cookies)}
        initOptions={keycloakInitOptions}
        onTokens={onAuthRefresh}
        onEvent={onKeycloakEvent}
      >
        <Provider store={store}>
          <ArtportableContexts
            accessToken={accessToken}
            keycloakState={keycloakState}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
              <GlobalComponents />
              <CookieConsentBar />
            </ThemeProvider>
          </ArtportableContexts>
        </Provider>
      </SSRKeycloakProvider>
    </>
  );
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
    pageProps: { ...pageProps },
  };
};
export default appWithTranslation(MyApp);
