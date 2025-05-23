import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import AboutUs from "../app/components/AboutUs/AboutUs";
import MainOption from "../app/components/Main/MainOption";
import { useMediaQuery, useTheme } from "@mui/material";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function About({ navBarItems }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <MainOption
        fullWidth={true}
        navBarItems={navBarItems}
        noHeaderPadding={isMobile}
      >
        <AboutUs />
      </MainOption>
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
        "about",
      ])),
    },
    revalidate: 60,
  };
}
