import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/index.css";
import { styles as sharedStyles } from "../styles/shared.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import Main from "../app/components/Main/Main";
import { useTranslation } from "next-i18next";
import {
  // MenuItem,
  Tab,
  Tabs,
  // TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import TabPanel from "../app/components/TabPanel/TabPanel";
import { useDispatch, useStore } from "react-redux";
import { SET_TAB } from "../app/redux/actions/discoverActions";
// import { useGetTags } from "../app/hooks/dataFetching/Artworks";
import { useMainWidth } from "../app/hooks/useWidth";
import IndexHero from "../app/components/IndexHero/IndexHero";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";
// import DiscoverTopArtTab from "../app/components/DiscoverTopArtTab/DiscoverTopArtTab";
// import DiscoverTopArtistsTab from "../app/components/DiscoverTopArtistTab/DiscoverTopArtistsTab";
// import { Artwork } from "../app/models/Artwork";
// import Artist from "../app/models/Artist";
// import { id } from "date-fns/locale";
import DiscoverArtistsTab from "../app/components/DiscoverArtistsTab/DiscoverArtistsTab";
import Head from "next/head";
// import DiscoverMonthlyArtistsTab from "../app/components/DiscoverMonthlyArtistTab/DiscoverMonthlyArtistTab";
// import DiscoverArtTab from "../app/components/DiscoverArtTab/DiscoverArtTab";
import DiscoverTrendingArtTab from "../app/components/DiscoverTrendingArtTab/DiscoverTrendingArtTab";
import DiscoverTrendingArtTabDesktop from "../app/components/DiscoverTrendingArtTabDesktop/DiscoverTrendingArtTabDesktop";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { DiscoverMyLikedArtTab } from "../app/components/DiscoverMyLikedArt/DiscoverMyLikedArt";
// import { useRedirectToLoginIfNotLoggedIn } from "../app/hooks/useRedirectToLoginIfNotLoggedIn";
import DiscoverHighLightsTab from "../app/components/DiscoverHighlightsTab/DiscoverHighlightsTab";
import DiscoverLatestArtTab from "../app/components/DiscoverLatestArt/DiscoverLatestArt";
// import AdDialog from "../app/components/AdDialog/AdDialog";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../app/utils/googleAnalytics";
// import router from "next/router";
import { useKeycloak } from "@react-keycloak/ssr";

import { useRouter } from "next/router";
// import Typography from "@material-ui/core/Typography";
import { getCurrentLanguage } from "../constants/keycloakSettings";
import DiscoverStoriesTab from "../app/components/DiscoverStoriesTab/DiscoverStoriesTab";
import Showroom from "../app/components/Showroom/Showroom";
import RocketCarousel from "../app/components/Carousel/RocketCarousel";
import Hotjar from "@hotjar/browser";
import DiscoverPromotedArtTab from "../app/components/DiscoverPromotedArt/DiscoverPromotedArt";
import CataloguedByArtportable from "../app/components/CataloguedByArtportable/CataloguedByArtportable";
import StoryCarousel from "../app/components/Carousel/StoryCarousel";
import Typography from "@mui/material/Typography";
import AdDialog from "../app/components/AdDialog/AdDialog";
import { Membership } from "../app/models/Membership";
import IndexHeroRenewed from "../app/components/IndexHero/IndexHeroRenewed";
import { block } from "sharp";
import DiscoverAafArtTab from "../app/components/DiscoverAafArt/DiscoverAafArt";
import Button from "../app/components/Button/Button";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { KeycloakInstance } from "keycloak-js";

export default function DiscoverPage({ navBarItems }) {
  const { t } = useTranslation([
    "index",
    "header",
    "plans",
    "common",
    "discover",
  ]);
  const s = styles();
  const sShared = sharedStyles();
  const store = useStore();

  const { username, socialId, isSignedIn, membership } =
    useContext(UserContext);
  const dispatch = useDispatch();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const discoverTab = store.getState()?.discover?.tab ?? 1;
  const discoverTopArtTab = store.getState()?.discoverTopArtTab?.tab ?? 0;
  const rowWidth = useMainWidth().wide;
  const [activeTab, setActiveTab] = useState(discoverTopArtTab);
  const { loading, setLoading } = useContext(LoadingContext);
  const [loadMoreArtworks, setLoadMoreArtworks] = useState(true);
  const [openAdDialog, setOpenAdDialog] = useState(false);
  // const [artHeader, setArtHeader] = useState('HEADER')
  const { keycloak } = useKeycloak();

  const AD_INTERVAL = 300000; // Ad Dialog
  const router = useRouter();
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");

  useEffect(() => {
    if (keycloak?.authenticated && !sessionStorage.getItem("loggedIn")) {
      sessionStorage.setItem("loggedIn", "true");
      router.push("/" + getCurrentLanguage());
    } else if (!keycloak?.authenticated) {
      sessionStorage.removeItem("loggedIn");
    }
  }, [keycloak?.authenticated, router]);

  function toggleAdDialog() {
    setOpenAdDialog(false);
    // Save the current time when the dialog is closed (converted to string)
    sessionStorage.setItem("lastShownTime", Date.now().toString());
  }

  useEffect(() => {
    const lastShownTime = sessionStorage.getItem("lastShownTime");

    if (!lastShownTime || Date.now() - Number(lastShownTime) >= AD_INTERVAL) {
      setOpenAdDialog(true);
    }

    // Set up a timer to automatically show the ad again after 5 minutes
    const adTimer = setInterval(() => {
      const lastShownTime = sessionStorage.getItem("lastShownTime");

      if (!lastShownTime || Date.now() - Number(lastShownTime) >= AD_INTERVAL) {
        setOpenAdDialog(true);
      }
    }, 1000); // Check every second

    return () => clearInterval(adTimer); // Cleanup the interval on unmount
  }, []);

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
    if (sessionStorage.getItem("payment")) {
      router.reload();
      sessionStorage.removeItem("payment");
    }
  }, []);
  const { locale } = router;

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

  const scrollToDiscoverRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const nextSectionRef = useRef(null); // Create a reference to the target div

  const scrollToNextSection = () => {
    if (nextSectionRef.current) {
      // Calculate the top position of the element
      const topPosition =
        nextSectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      const headerOffset = 50; // Adjust this value if you have a fixed header (set to 0 if none)

      // Scroll to the top of the target section, minus any offset
      window.scrollTo({
        top: topPosition - headerOffset, // Scroll to the top minus header height if needed
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  function clsx(largeButtonFindArt: any, findArtButton: any, noBorder: any) {
    throw new Error("Function not implemented.");
  }

  return (
    <Main
      noHeaderPadding
      wide={useWideLayout || true}
      isShow={false}
      navBarItems={navBarItems}
      fullWidth={fullWidth && false}
    >
      <Head>
        <title>{t("index:title")}</title>
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
      {!isSignedIn.value && (
        <IndexHeroRenewed onScrollDown={scrollToNextSection} />
      )}

      {isSignedIn.value && (
        <>
          {membership.value === Membership.Portfolio ? (
            <AdDialog
              openAdDialog={openAdDialog}
              setOpenAdDialog={setOpenAdDialog}
              onClose={toggleAdDialog}
            />
          ) : (
            <></>
          )}
        </>
      )}
      <div ref={nextSectionRef}></div>
      <RocketCarousel
        forDesktop={!isMobile}
        containerStyle={{
          margin: "40px 0 0px 0",
        }}
      />

      {/*   <div className={s.exhibitionBoost}>{t("header:boostedExhibition")}</div>
      <StoryCarousel
        forDesktop={!isMobile}
        containerStyle={{
          margin: 0,
        }}
      /> */}

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
        <div
          ref={scrollToDiscoverRef}
          className={s.discoverContainer}
          // Set minHeight to avoid page jumping when switching tabs.
          style={{ minHeight: "100vh" }}
        >
          <div className={s.tabContainer}>
            <Tabs
              className={s.artTabs}
              value={activeTab}
              onChange={(_, newValue) => setTab(newValue)}
              variant={"scrollable"}
              scrollButtons={"on"}
              // Change underline color through TabIndicatorProps:
              TabIndicatorProps={{
                style: {
                  backgroundColor: "black",
                },
              }}
            >
              <Tab
                className={s.text}
                label={t("discover:latestArt")}
                {...a11yProps(t("discover:latestArt"))}
              />
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
                label={t("discover:stories")}
                {...a11yProps(t("discover:stories"))}
              />
              <Tab
                className={s.text}
                label={t("discover:artists")}
                {...a11yProps(t("discover:artists"))}
              />

              <Tab
                className={s.text}
                label={t("discover:Hus & Hem")}
                {...a11yProps(t("discover:Hus & Hem"))}
              />

              {/*     <Tab
                className={s.text}
                label={t("discover:showroom")}
                {...a11yProps(t("discover:showroom"))}
              /> */}

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
              <TabPanel value={activeTab} index={1}>
                {!isMobile ? (
                  <DiscoverTrendingArtTabDesktop
                    username={username.value}
                    socialId={socialId.value}
                    rowWidth={rowWidth}
                    loadMore={loadMoreArtworks}
                    loadImages={loadImages}
                    stopLoadImages={stopLoadImages}
                    activeTab={activeTab}
                    header={t("discover:trendingArt")}
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
                    header={t("discover:trendingArt")}
                  />
                )}
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
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

              <TabPanel value={activeTab} index={3}>
                <DiscoverStoriesTab />
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
                <DiscoverArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
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
        "forms",
      ])),
    },
    revalidate: 60,
  };
}
