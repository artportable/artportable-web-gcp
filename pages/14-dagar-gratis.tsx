import { Typography } from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FreeTrial from "../app/components/FreeTrial/FreeTrial";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { styles } from "../styles/gdpr.css";

export default function FourteenDays({ navBarItems }) {
  const { t } = useTranslation(["trial"]);
  const s = styles();

  return (
    <>
      <Main navBarItems={navBarItems}>
        <FreeTrial />
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
        "trial",
      ])),
    },
    revalidate: 60,
  };
}
