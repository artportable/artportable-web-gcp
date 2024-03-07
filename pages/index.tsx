import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/index.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import Main from "../app/components/Main/Main";
import { useTranslation } from "next-i18next";
import {
  Box,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import TabPanel from "../app/components/TabPanel/TabPanel";
import { useDispatch, useStore } from "react-redux";
import { SET_TAB } from "../app/redux/actions/discoverActions";
import { useGetTags } from "../app/hooks/dataFetching/Artworks";
import { useMainWidth } from "../app/hooks/useWidth";
import IndexHero from "../app/components/IndexHero/IndexHero";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";
import DiscoverTopArtTab from "../app/components/DiscoverTopArtTab/DiscoverTopArtTab";
import DiscoverTopArtistsTab from "../app/components/DiscoverTopArtistTab/DiscoverTopArtistsTab";
import { Artwork } from "../app/models/Artwork";
import Artist from "../app/models/Artist";
import { id } from "date-fns/locale";
import DiscoverArtistsTab from "../app/components/DiscoverArtistsTab/DiscoverArtistsTab";
import Head from "next/head";
import DiscoverMonthlyArtistsTab from "../app/components/DiscoverMonthlyArtistTab/DiscoverMonthlyArtistTab";
import DiscoverArtTab from "../app/components/DiscoverArtTab/DiscoverArtTab";
import DiscoverTrendingArtTab from "../app/components/DiscoverTrendingArtTab/DiscoverTrendingArtTab";
import DiscoverTrendingArtTabDesktop from "../app/components/DiscoverTrendingArtTabDesktop/DiscoverTrendingArtTabDesktop";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { DiscoverMyLikedArtTab } from "../app/components/DiscoverMyLikedArt/DiscoverMyLikedArt";
import { useRedirectToLoginIfNotLoggedIn } from "../app/hooks/useRedirectToLoginIfNotLoggedIn";
import DiscoverHighLightsTab from "../app/components/DiscoverHighlightsTab/DiscoverHighlightsTab";
import DiscoverLatestArtTab from "../app/components/DiscoverLatestArt/DiscoverLatestArt";
import AdDialog from "../app/components/AdDialog/AdDialog";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../app/utils/googleAnalytics";
import router from "next/router";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import { getCurrentLanguage } from "../constants/keycloakSettings";
import DiscoverStoriesTab from "../app/components/DiscoverStoriesTab/DiscoverStoriesTab";
import Showroom from "../app/components/Showroom/Showroom";
import RocketCarousel from "../app/components/Carousel/RocketCarousel";
import Hotjar from "@hotjar/browser";
import DiscoverPromotedArtTab from "../app/components/DiscoverPromotedArt/DiscoverPromotedArt";
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
  const [openAdDialog, setOpenAdDialog] = useState(true);
  // const [artHeader, setArtHeader] = useState('HEADER')
  const { keycloak } = useKeycloak();

  const router = useRouter();
  useEffect(() => {
    if (keycloak?.authenticated && !sessionStorage.getItem("loggedIn")) {
      sessionStorage.setItem("loggedIn", "true");
      router.push("/" + getCurrentLanguage() + "/feed");
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
  useEffect(() => {
    if (sessionStorage.getItem("dialog")) {
      setOpenAdDialog(false);
    } else if (openAdDialog) {
      trackGoogleAnalytics(
        ActionType.SHOW_FIRST_PAGE_AD,
        CategoryType.INTERACTIVE
      );
    }
  }, []);
  useEffect(() => {
    if (openAdDialog === false) {
      sessionStorage.setItem("dialog", "false");
    }
  }, [toggleAdDialog]);
  useEffect(() => {
    if (sessionStorage.getItem("payment")) {
      router.reload();
      sessionStorage.removeItem("payment");
    }
  }, []);
  const { locale } = router;

  const siteId = 1968208;
  const hotjarVersion = 6;

  Hotjar.init(siteId, hotjarVersion);

  Hotjar.init(siteId, hotjarVersion, {
    debug: true,
  });

  const useWideLayout =
    activeTab === 0 ||
    activeTab === 1 ||
    activeTab === 2 ||
    activeTab === 3 ||
    activeTab === 5;

  const fullWidth = activeTab === 4;

  function setTab(value) {
    setActiveTab(value);
    dispatch({
      type: SET_TAB,
      payload: value,
    });
  }

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`,
    };
  }

  const loadImages = () => {
    setLoadMoreArtworks(true);
  };

  const stopLoadImages = () => {
    setLoadMoreArtworks(false);
  };

  function toggleAdDialog() {
    setOpenAdDialog(false);
  }

  const scrollToDiscoverRef = useRef(null);
  const [clickedTabOnce, setClickedTabOnce] = useState(false);

  // useEffect(() => {
  //   if (scrollToDiscoverRef.current && activeTab === 0 && clickedTabOnce) {
  //     setTimeout(() => {
  //       scrollToDiscoverRef.current.scrollIntoView();
  //       window.scrollBy(0, -70);
  //     }, 0);
  //   }
  //   if (activeTab !== 0) {
  //     setClickedTabOnce(true);
  //   }
  // }, [activeTab]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Main
      noHeaderPadding
      wide={useWideLayout || true}
      isShow={false}
      navBarItems={navBarItems}
      fullWidth={fullWidth && false}
    >
      <Head>
        <meta name="title" content={t("index:title")} />
        <meta name="description" content={t("index:description")} />
        <meta name="url" content="https://artportable.com/" />

        <meta property="og:title" content={t("index:title")} />
        <meta property="og:description" content={t("index:description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artportable.com/" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />

        <meta property="twitter:title" content={t("index:title")} />
        <meta property="twitter:description" content={t("index:description")} />
        <meta property="twitter:type" content="website" />
        <meta property="twitter:url" content="https://artportable.com/" />
        <meta
          name="google-site-verification"
          content="pnoyk134Ulrd9ic98fcyAa-MW6zDtr8EklOyRNtONSQ"
        />
        <meta
          property="twitter:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}`} />
      </Head>
      {!isSignedIn.value && <IndexHero></IndexHero>}

      <RocketCarousel
        forDesktop={!isMobile}
        containerStyle={{
          margin: "50px 0 25px 0",
        }}
      />

      <>
        {!isSignedIn.value &&
          activeTab != 1 &&
          activeTab != 2 &&
          activeTab != 3 &&
          activeTab != 4 &&
          activeTab != 5}
        {/* {<AdDialog
            openAdDialog={openAdDialog}
            setOpenAdDialog={setOpenAdDialog}
            onClose={toggleAdDialog}
          />} */}
        <div ref={scrollToDiscoverRef} className={s.discoverContainer}>
          <div className={s.tabContainer}>
            <Tabs
              className={s.artTabs}
              value={activeTab}
              onChange={(_, newValue) => setTab(newValue)}
              variant={"scrollable"}
              scrollButtons={"on"}
            >
              <Tab
                className={s.text}
                label={t("discover:topArt")}
                {...a11yProps(t("discover:topArt"))}
              />
              <Tab
                className={s.text}
                label={t("discover:highlights")}
                {...a11yProps(t("discover:artists"))}
              />
              <Tab
                className={s.text}
                label={t("discover:Hus & Hem")}
                {...a11yProps(t("discover:Hus & Hem"))}
              />
              <Tab
                className={s.text}
                label={t("discover:latestArt")}
                {...a11yProps(t("discover:latestArt"))}
              />
              <Tab
                className={s.text}
                label={t("discover:stories")}
                {...a11yProps(t("discover:stories"))}
              />

              <Tab
                className={s.text}
                label={t("discover:showroom")}
                {...a11yProps(t("discover:showroom"))}
              />
              <Tab
                className={s.text}
                label={t("discover:artists")}
                {...a11yProps(t("discover:artists"))}
              />
              {isSignedIn.value && (
                <Tab
                  className={s.text}
                  label={t("discover:myLikedArt")}
                  {...a11yProps(t("discover:myLikedArt"))}
                />
              )}
            </Tabs>
          </div>
          {!loading && (
            <Box paddingTop={4}>
              <TabPanel value={activeTab} index={0}>
                {!isMobile ? (
                  <DiscoverTrendingArtTabDesktop
                    username={username.value}
                    socialId={socialId.value}
                    rowWidth={rowWidth}
                    loadMore={loadMoreArtworks}
                    loadImages={loadImages}
                    stopLoadImages={stopLoadImages}
                    activeTab={activeTab}
                    header={t("discover:topArt")}
                  />
                ) : (
                  <DiscoverTrendingArtTab
                    username={username.value}
                    socialId={socialId.value}
                    rowWidth={rowWidth}
                    loadMore={loadMoreArtworks}
                    loadImages={loadImages}
                    stopLoadImages={stopLoadImages}
                    activeTab={activeTab}
                    header={t("discover:topArt")}
                  />
                )}
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <DiscoverHighLightsTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                  header={t("discover:highlights")}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <DiscoverPromotedArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
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
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
                <DiscoverStoriesTab />
              </TabPanel>

              <TabPanel value={activeTab} index={5}>
                <Showroom />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <DiscoverArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <DiscoverMyLikedArtTab
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={""}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                  header={t("discover:myLikedArt")}
                />
              </TabPanel>
            </Box>
          )}
        </div>
      </>
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
        "snackbar",
        "support",
        "articles",
        "feed",
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}
