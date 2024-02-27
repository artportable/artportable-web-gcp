import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import { styles } from "../styles/exhibitions.css";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { useRouter } from "next/router";
import { Tabs, Tab, CardHeader } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
} from "@material-ui/core";
import Showroom from "../app/components/Showroom/Showroom";

export default function Exhibition({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation("exhibitions");

  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();

  return (
    <>
      <Main fullWidth={true} navBarItems={navBarItems}>
        <Head>
          <title>{t("title")}</title>

          <meta name="description" content={t("artportableExhibition")} />
          <meta name="url" content="https://artportable.com/showroom" />
          <link rel="canonical" href={`${publicUrl}/${locale}/showroom`} />
        </Head>
        <Showroom></Showroom>
      </Main>
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
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}
