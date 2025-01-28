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
import Box from "@mui/material/Box";
import { useDispatch, useStore } from "react-redux";
import { SET_TAB } from "../app/redux/actions/discoverActions";
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

// Dynamically import heavy components
const DiscoverLatestArtTab = dynamic(
  () => import("../app/components/DiscoverLatestArt/DiscoverLatestArt"),
  { ssr: false }
);

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

  useEffect(() => {
    if (keycloak?.authenticated && !sessionStorage.getItem("loggedIn")) {
      sessionStorage.setItem("loggedIn", "true");
      router.push("/" + getCurrentLanguage());
    } else if (!keycloak?.authenticated) {
      sessionStorage.removeItem("loggedIn");
    }
  }, [keycloak?.authenticated, router]);

  useEffect(() => {
    if (!isSignedIn.isPending) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (isSignedIn.value) {
      setActiveTab(discoverTab);
    }
  }, [isSignedIn]);

  const loadImages = () => setLoadMoreArtworks(true);
  const stopLoadImages = () => setLoadMoreArtworks(false);

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

      <div className={s.discoverContainer} style={{ minHeight: "100vh" }}>
        {!loading && (
          <Box paddingTop={4}>
            <DiscoverLatestArtTab
              username={username.value}
              socialId={socialId.value}
              rowWidth={rowWidth}
              loadMore={loadMoreArtworks}
              loadImages={loadImages}
              stopLoadImages={stopLoadImages}
              activeTab={activeTab}
              header={t("discover:latestArt")}
            />
          </Box>
        )}
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
