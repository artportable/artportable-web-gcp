import React, { useEffect } from "react";
import Router from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function Register({ navBarItems }) {
  const { t } = useTranslation(["common"]);
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:1968208,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);

    // Cleanup function to remove script if component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/register") {
      Router.push(
        "https://idp.artportable.com/auth/realms/prod/protocol/openid-connect/registrations?client_id=artportable-web&redirect_uri=https%3A%2F%2Fartportable.com%2Fplans&state=3fc6159f-0e2e-4bb4-9b2b-3f3ff826affa&response_mode=fragment&response_type=code&scope=openid&nonce=7d557230-2875-4d33-83b0-2d78830dffcb&ui_locales=sv&code_challenge=6FM1cKFB3vk67DNssTbcr0KxJmgo_OBQVCJFCrYqDqs&code_challenge_method=S256"
      );
    }
  });

  return (
    <>
      <Head>
        <meta name="title" content={t("title")} />
        <meta name="description" content={t("description")} />

        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("description")} />
        <meta property="og:type" content="register" />
        <meta property="og:url" content="https://artportable.com/register" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />

        <meta name="twitter:title" content={t("title")} />
        <meta name="twitter:description" content={t("description")} />
        <meta name="twitter:url" content="https://artportable.com/register" />
        <meta
          name="twitter:image"
          content="/images/artportable_tv_commercial.png"
        />
      </Head>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
