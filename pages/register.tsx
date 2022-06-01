import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function Register({navBarItems}) {
  const { t } = useTranslation(['header']);

  return (
      <>
      <Head>
      <meta name="title" content={t('title')} />
        <meta name="description" content={t('description')} />
        <meta property="og:title" content={t('title')} />
        <meta property="og:description" content={t('description')} />
        <meta property="og:type" content="register" />
        <meta property="og:url" content="https://artportable.com/register" />
        <meta property="og:image" content="/images/artportable_tv_commercial.png" />
      </Head>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems(); 
  const signUpRedirect = process.env.REDIRECT_TO_SIGN_UP
  return {
    props: {
      navBarItems: navBarItems,
      ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr', 'support', 'plans']),
    },
    revalidate: 60,
  }
}