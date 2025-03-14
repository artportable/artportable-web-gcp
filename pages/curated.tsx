import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../app/components/Main/Main";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../app/contexts/user-context";
import { useMainWidth } from "../app/hooks/useWidth";
import DiscoverFilteredArt from "../app/components/DiscoverFilteredArt/DiscoverFilteredArt";
import DiscoverHighLightsTab from "../app/components/DiscoverHighlightsTab/DiscoverHighlightsTab";
import { styles } from "../styles/curated.css";
import { useMediaQuery, useTheme } from "@mui/material";
export default function latest({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header", "index"]);
  const s = styles();
  const { locale } = useRouter();
  const { username, socialId, isSignedIn, membership } =
    useContext(UserContext);

  const rowWidth = useMainWidth().wide;
  const [loadMoreArtworks, setLoadMoreArtworks] = useState(true);

  const loadImages = () => {
    setLoadMoreArtworks(true);
  };

  const stopLoadImages = () => {
    setLoadMoreArtworks(false);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Main
        noHeaderPadding
        wide={false}
        isShow={true}
        navBarItems={navBarItems}
        fullWidth={false}
      >
        <Head>
          <title>{t("discover")}</title>
          <meta name="description" content={t("discover")} />
          <link rel="canonical" href={`${publicUrl}/${locale}/discover`} />
        </Head>
        <div
          style={{
            width: !isMobile ? "100%" : "100%",
          }}
          className={s.textWrapper}
        >
          {" "}
          <div className={s.wrap}>
            <div className={s.title}>{t("index:titleHeader")}</div>
            <div className={s.text}>{t("index:descriptionBody")}</div>
          </div>
        </div>
        <div className={s.container}>
          {" "}
          <DiscoverHighLightsTab
            username={username.value}
            socialId={socialId.value}
            rowWidth={rowWidth}
            loadMore={loadMoreArtworks}
            loadImages={loadImages}
            stopLoadImages={stopLoadImages}
            activeTab={0}
            header={t("")}
          />
        </div>
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
