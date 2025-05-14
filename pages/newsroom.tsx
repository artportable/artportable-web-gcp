import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../app/components/Main/Main";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "../app/contexts/user-context";
import { useMainWidth } from "../app/hooks/useWidth";
import DiscoverFilteredArt from "../app/components/DiscoverFilteredArt/DiscoverFilteredArt";
import DiscoverStoriesTab from "../app/components/DiscoverStoriesTab/DiscoverStoriesTab";

import { styles } from "../styles/curated.css";
import BannerText from "../app/components/BannerText/BannerText";
import MainOption from "../app/components/Main/MainOption";
export default function newsroom({ navBarItems }) {
  const s = styles();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header", "index"]);
  const { locale } = useRouter();
  const { username, socialId, isSignedIn, membership } =
    useContext(UserContext);

  return (
    <>
      <MainOption navBarItems={navBarItems} fullWidth>
        <Head>
          <title>{t("discover")}</title>
          <meta name="description" content={t("discover")} />
          <link rel="canonical" href={`${publicUrl}/${locale}/discover`} />
        </Head>

        <BannerText title={t("index:titleNews")} text={t("index:textNews")} />

        <div style={{ marginTop: "30px" }}>
          <DiscoverStoriesTab />
        </div>
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
        "art",
        "header",
        "footer",
        "common",
        "discover",
        "tags",
        "index",
        "plans",
        "snackbar",
        "support",
        "articles",
        "feed",
        "exhibitions",
        "forms",
        "common",
        "locations",
        "art",
        "discover",
        "tags",
      ])),
    },
    revalidate: 60,
  };
}
