import { Box, Card, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import AboutUs from "../app/components/AboutUs/AboutUs";
import IndexHero from "../app/components/IndexHero/IndexHero";
import Main from "../app/components/Main/Main";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { styles } from "../styles/about.css";

export default function About({navBarItems}) {
  const mdPlusScreenOrDown = useBreakpointDown('mdPlus');
  const { t } = useTranslation(['gdpr']);
  const s = styles();


  return (
    <>
        {/* <IndexHero /> */}
      <Main wide={mdPlusScreenOrDown ? true : false} navBarItems={navBarItems}>
        <AboutUs />
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems(); 
  return {
    props: {
      navBarItems: navBarItems,
      ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr', 'support', 'plans']),
    },
    revalidate: 60,
  }
}