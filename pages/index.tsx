import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/index.css";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Main from "../app/components/Main/Main";
import { useTranslation } from "next-i18next";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useStore } from "react-redux";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";
import Head from "next/head";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import IndexHeroRenewed from "../app/components/IndexHero/IndexHeroRenewed";
import dynamic from "next/dynamic"; // For dynamic imports
import { getCurrentLanguage } from "../constants/keycloakSettings";
import { useMainWidth } from "../app/hooks/useWidth";
import IndexCategories from "../app/components/IndexHero/IndexCategories";

import { useGetLatestArtworksForIndex } from "../app/hooks/dataFetching/Artworks";
import StoryCarousel from "../app/components/Carousel/StoryCarousel";
import LatestCarousel from "../app/components/Carousel/LatestCarousel";
import CuratedCarousel from "../app/components/Carousel/CuratedCarousel";

const RocketCarousel = dynamic(
  () => import("../app/components/Carousel/RocketCarousel")
);

export default function DiscoverPage({ navBarItems }) {
  const { t } = useTranslation([
    "index",
    "header",
    "plans",
    "common",
    "discover",
  ]);
  const s = styles();
  const store = useStore();

  const { username, socialId, isSignedIn } = useContext(UserContext);
  const dispatch = useDispatch();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const discoverTab = store.getState()?.discover?.tab ?? 1;
  const discoverTopArtTab = store.getState()?.discoverTopArtTab?.tab ?? 0;
  const rowWidth = useMainWidth().wide;
  const [activeTab, setActiveTab] = useState(discoverTopArtTab);
  const { loading, setLoading } = useContext(LoadingContext);
  const [loadMoreArtworks, setLoadMoreArtworks] = useState(true);
  const [openAdDialog, setOpenAdDialog] = useState(false);
  const { keycloak } = useKeycloak();
  const router = useRouter();

  const { data, isLoading, isError } = useGetLatestArtworksForIndex();

  const [artworks, setArtworks] = useState(data);

  useEffect(() => {
    if (data?.artworks) {
      setArtworks(data?.artworks);
    }
  }, [data]);

  useEffect(() => {
    console.log(artworks);
  }, [artworks]);

  const scrollToNextSection = useCallback(() => {
    const nextSection = nextSectionRef.current;
    if (nextSection) {
      const topPosition =
        nextSection.getBoundingClientRect().top + window.pageYOffset;
      const headerOffset = 50;
      window.scrollTo({
        top: topPosition - headerOffset,
        behavior: "smooth",
      });
    }
  }, []);

  const nextSectionRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Main
      noHeaderPadding
      wide={true}
      isShow={false}
      navBarItems={navBarItems}
      fullWidth={false}
    >
      <Head>
        <title>{t("index:title")}</title>
        <meta name="description" content={t("index:description")} />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <meta property="og:url" content="https://artportable.com/" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '331292174363133');
        fbq('track', 'PageView');
      `,
          }}
        />
      </Head>

      {!isSignedIn.value && (
        <IndexHeroRenewed onScrollDown={scrollToNextSection} />
      )}

      <div ref={nextSectionRef}></div>

      <div style={{ marginTop: "50px" }}>
        <Typography variant="h4" style={{ fontWeight: 500 }}>
          {t("featured")}
        </Typography>
        <RocketCarousel
          forDesktop={!isMobile}
          containerStyle={{ margin: "40px 0 0px 0" }}
        />
      </div>

      <div
        style={{ gridColumn: "1 / 4", width: "100vw", marginBottom: "100px" }}
      >
        <IndexCategories />
      </div>

      <div style={{ marginTop: "50px" }}>
        <div style={{ fontSize: "32px", marginBottom: "20px" }}>
          Nytt på Artportable
        </div>
        <LatestCarousel forDesktop={!isMobile}></LatestCarousel>
      </div>
      <div
        style={{ fontSize: "32px", marginBottom: "20px", marginTop: "112px" }}
      >
        Kurerat innehåll
      </div>
      <div
        style={{
          marginTop: "50px",
          gridColumn: "1 / 4",
          width: !isMobile ? "90%" : "100%",
          margin: "0 auto",
        }}
      >
        <CuratedCarousel forDesktop={!isMobile}></CuratedCarousel>
      </div>
    </Main>
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
      ])),
    },
    revalidate: 60,
  };
}
