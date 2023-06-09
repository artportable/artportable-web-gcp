import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/index.css";
import React, { useContext, useEffect, useState } from "react";
import Main from "../app/components/Main/Main";
import { useTranslation } from "next-i18next";
import { Box, MenuItem, Tab, Tabs, TextField } from "@material-ui/core";
import TabPanel from "../app/components/TabPanel/TabPanel";
import { useDispatch, useStore } from "react-redux";
import { SET_TAB } from "../app/redux/actions/discoverActions";
import { useGetTags } from "../app/hooks/dataFetching/Artworks";
import { useMainWidth } from "../app/hooks/useWidth";
import IndexHero from "../app/components/IndexHero/IndexHero";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";
import DiscoverTopArtTab from "../app/components/DiscoverTopArtTab/DiscoverTopArtTab";
import DiscoverTopArtistsTab from "../app/components/DisvoerTopArtistTab/DiscoverTopArtistsTab";
import { Artwork } from "../app/models/Artwork";
import Artist from "../app/models/Artist";
import { id } from "date-fns/locale";
import DiscoverArtistsTab from "../app/components/DiscoverArtistsTab/DiscoverArtistsTab";
import Head from "next/head";
import DiscoverMonthlyArtistsTab from "../app/components/DiscoverMonthlyArtistTab/DiscoverMonthlyArtistTab";
import DiscoverArtTab from "../app/components/DiscoverArtTab/DiscoverArtTab";
import DiscoverTrendingArtTab from "../app/components/DiscoverTrendingArtTab/DiscoverTrendingArtTab";
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
import { getCurrentLanguage } from "../constants/keycloakSettings";
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
  const [sold, setSold] = useState("All");
  const { username, socialId, isSignedIn } = useContext(UserContext);
  const dispatch = useDispatch();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const discoverTab = store.getState()?.discover?.tab ?? 1;
  const discoverTopArtTab = store.getState()?.discoverTopArtTab?.tab ?? 0;
  const rowWidth = useMainWidth().wide;
  const [activeTab, setActiveTab] = useState(discoverTopArtTab);
  const { loading, setLoading } = useContext(LoadingContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const [loadMoreArtworks, setLoadMoreArtworks] = useState(true);
  const [openAdDialog, setOpenAdDialog] = useState(true);
  const { keycloak } = useKeycloak();
  const [justLoggedIn, setJustLoggedIn] = useState(false);
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

  const useWideLayout =
    activeTab === 0 ||
    activeTab === 1 ||
    activeTab === 2 ||
    activeTab === 3 ||
    activeTab === 4 ||
    activeTab === 8;

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

  const subjectOptions = [
    {
      value: "All",
      label: t("index:all"),
    },
    {
      value: "Unsold",
      label: t("index:unsold"),
    },
    {
      value: "Sold",
      label: t("index:sold"),
    },
  ];

  const loadImages = () => {
    setLoadMoreArtworks(true);
  };

  const stopLoadImages = () => {
    setLoadMoreArtworks(false);
  };

  function toggleAdDialog() {
    setOpenAdDialog(false);
  }

  return (
    <Main
      noHeaderPadding
      wide={useWideLayout}
      isShow={false}
      navBarItems={navBarItems}
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
          property="twitter:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={publicUrl} />
      </Head>
      {!loading && (
        <>
          {!isSignedIn.value && <IndexHero></IndexHero>}
          {/*  <AdDialog
              openAdDialog={openAdDialog}
              setOpenAdDialog={setOpenAdDialog}
              onClose={toggleAdDialog}
            /> */}
          <div className={s.discoverContainer}>
            <div className={s.tabContainer}>
              {activeTab === 0 ||
              activeTab === 1 ||
              activeTab === 2 ||
              activeTab === 3 ||
              activeTab === 4 ||
              activeTab === 8 ? (
                <form className={s.form}>
                  <div className={s.textFieldFlex}>
                    <TextField
                      classes={{
                        root: s.textField,
                      }}
                      select
                      variant="outlined"
                      value={sold}
                    >
                      {subjectOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          onClick={() => {
                            setSold(option.value);
                            loadImages();
                          }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </form>
              ) : null}
              <Tabs
                className={`${
                  activeTab < 5 || activeTab === 8 ? s.artTabs : s.artistTab
                }`}
                value={activeTab}
                onChange={(_, newValue) => setTab(newValue)}
                variant={"scrollable"}
                scrollButtons={"on"}
              >
                <Tab
                  className={s.text}
                  label={t("discover:trendingArt")}
                  {...a11yProps(t("discover:trendingArt"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:mostFollowed")}
                  {...a11yProps(t("discover:mostFollowed"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:highlights")}
                  {...a11yProps(t("discover:highlights"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:topArt")}
                  {...a11yProps(t("discover:topArt"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:latestArt")}
                  {...a11yProps(t("discover:latestArt"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:art")}
                  {...a11yProps(t("discover:art"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:monthlyArtist")}
                  {...a11yProps(t("discover:monthlyArtist"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:artists")}
                  {...a11yProps(t("discover:artists"))}
                />
                <Tab
                  className={s.text}
                  label={t("discover:myLikedArt")}
                  {...a11yProps(t("discover:myLikedArt"))}
                  onClick={redirectIfNotLoggedIn}
                />
              </Tabs>
            </div>
            <Box paddingTop={4}>
              <TabPanel value={activeTab} index={0}>
                <DiscoverTrendingArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <DiscoverTopArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <DiscoverHighLightsTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
                <DiscoverTopArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
                <DiscoverLatestArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <DiscoverArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <DiscoverMonthlyArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={7}>
                <DiscoverArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={8}>
                <DiscoverMyLikedArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={activeTab}
                />
              </TabPanel>
            </Box>
          </div>
        </>
      )}
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
      ])),
    },
    revalidate: 60,
  };
}
