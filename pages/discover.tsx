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
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HeaderComponent from "../app/components/DiscoverFilteredArt/HeaderComponent";

export default function discover({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
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
      <Main navBarItems={navBarItems} isShow={false} noHeaderPadding={isMobile}>
        <Head>
          <title>{t("discover")}</title>
          <meta name="description" content={t("discover")} />
          <link rel="canonical" href={`${publicUrl}/${locale}/discover`} />
        </Head>

        <DiscoverFilteredArt
          username={username.value}
          socialId={socialId.value}
          rowWidth={rowWidth}
          loadMore={loadMoreArtworks}
          loadImages={loadImages}
          stopLoadImages={stopLoadImages}
          activeTab={1}
          header={t("discover:trendingArt")}
          page={"likes"}
        />
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
