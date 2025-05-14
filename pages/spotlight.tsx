import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext, useState } from "react";
import AboutUs from "../app/components/AboutUs/AboutUs";
import Main from "../app/components/Main/Main";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import { styles } from "../styles/curated.css";
import { useRouter } from "next/router";
import { UserContext } from "../app/contexts/user-context";
import { useMainWidth } from "../app/hooks/useWidth";
import { useMediaQuery, useTheme } from "@mui/material";
import DiscoverSpotlightTab from "../app/components/DiscoverHighlightsTab/DiscoverSpotlightTab";
import BannerText from "../app/components/BannerText/BannerText";
import MainOption from "../app/components/Main/MainOption";
export default function Spotlight({ navBarItems }) {
  const mdPlusScreenOrDown = useBreakpointDown("mdPlus");
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
      <MainOption
        wide={mdPlusScreenOrDown ? true : false}
        navBarItems={navBarItems}
      >
        <BannerText
          title={t("index:spotlightTitle")}
          text={t("index:spotlightText")}
        />
        <div className={s.container}>
          {" "}
          <DiscoverSpotlightTab
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
        "header",
        "footer",
        "feed",
        "support",
        "plans",
        "locations",
        "index",
        "art",
        "discover",
        "tags",
        "index",
      ])),
    },
    revalidate: 60,
  };
}
