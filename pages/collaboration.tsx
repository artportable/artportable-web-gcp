import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/support.css";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";
import DiscoverPromotedArtTab from "../app/components/DiscoverPromotedArt/DiscoverPromotedArt";
import { useContext, useState } from "react";
import { UserContext } from "../app/contexts/user-context";
import { useMainWidth } from "../app/hooks/useWidth";

export default function Collaboration({ navBarItems }) {
  const s = styles();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();

  const { t } = useTranslation(["header"]);

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

  return (
    <Main
      navBarItems={navBarItems}
      wide={true}
      fullWidth={false}
      isShow={false}
      noHeaderPadding={true}
    >
      <Head>
        <meta name="title" content={t("collaboration")} />
        <meta name="description" content={t("collaboration")} />
        <meta property="og:title" content={t("collaboration")} />
        <meta property="og:description" content={t("collaboration")} />
        <meta
          property="og:url"
          content="https://artportable.com/collaboration"
        />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}/collaboration`} />
      </Head>
      <DiscoverPromotedArtTab
        username={username.value}
        socialId={socialId.value}
        rowWidth={rowWidth}
        loadMore={loadMoreArtworks}
        loadImages={loadImages}
        stopLoadImages={stopLoadImages}
        activeTab={0}
      />
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "header",
        "support",
        "footer",
        "support",
        "common",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
