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
  Typography,
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
import Flicking from "@egjs/react-flicking";
import { Arrow, Fade } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import GalinaTol from "../public/images/GalinaTol.jpg";

export default function DiscoverPage({ navBarItems }) {
  const { t } = useTranslation([
    "index",
    "header",
    "plans",
    "common",
    "discover",
    "tags",
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

  const [fetchType, setFetchType] = useState("trending");

  const _plugins = [new Fade()];
  const [clickEnabled, setClickEnabled] = useState(true);
  const flickingRef = useRef(null);

  const handlePrevClick = () => {
    if (flickingRef.current && clickEnabled) {
      flickingRef.current.prev();
    }
  };

  const handleNextClick = () => {
    if (flickingRef.current && clickEnabled) {
      flickingRef.current.next();
    }
  };
  const tags = useGetTags();
  const [activeFilter, setActiveFilter] = useState("trending");

  const knownFetchTypes = [
    "trending",
    "latest",
    "topsold",
    "artists",
    "favorites",
  ];

  const tagPlaceholder = knownFetchTypes.includes(activeFilter)
    ? "Originalkonst"
    : activeFilter;

  const [clickedFilter, setClickedFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setClickedFilter(filter);
    console.log("clicked filter is ", filter);
  };

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
          {
            <AdDialog
              openAdDialog={openAdDialog}
              setOpenAdDialog={setOpenAdDialog}
              onClose={toggleAdDialog}
            />
          }
          <div className={s.discoverContainer}>
            <Box paddingTop={4}>
              <Flicking
                ref={flickingRef}
                gap={6}
                circular={true}
                align="center"
                onMoveStart={() => setClickEnabled(false)}
                onMoveEnd={() => setClickEnabled(true)}
                initialIndex={0}
                plugins={_plugins}
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/389e4fa4-23d1-49cf-aefb-fcb5979e7a84.jpg")`,
                    backgroundSize: "cover", // make sure the image covers the div
                    backgroundRepeat: "no-repeat", // prevent the image from repeating
                    backgroundPosition: "center", // center the image in the div
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "trending" ? s.activePanel : ""
                  }`}
                  onClick={() => {
                    handleFilterClick("trending");
                  }}
                >
                  <div className={s.carouselItem}>Trending</div>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/0fd83649-29f8-4237-bd55-062763981f49.jpg")`,
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "topsold" ? s.activePanel : ""
                  }`}
                  onClick={() => {
                    handleFilterClick("topsold");
                  }}
                >
                  <div className={s.carouselItem}>Sold</div>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/Atelier-tegneprosess19.jpg")`,
                    backgroundSize: "cover", // make sure the image covers the div
                    backgroundRepeat: "no-repeat", // prevent the image from repeating
                    backgroundPosition: "center", // center the image in the div
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  className={s.panel}
                  onClick={() => setActiveFilter("artists")}
                >
                  <div className={s.carouselItem}>Artists</div>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/436ba926-2b14-43f2-8090-ab9b26bf8eec.jpg")`,
                    backgroundSize: "cover", // make sure the image covers the div
                    backgroundRepeat: "no-repeat", // prevent the image from repeating
                    backgroundPosition: "top 50px", // center the image in the div
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  className={s.panel}
                  onClick={() => setActiveFilter("monthlyArtist")}
                >
                  <div className={s.carouselItem}>Monthly Artist</div>
                </div>
                {tags.data &&
                  tags.data.map((tag, index) => (
                    <div
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #c67777",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                      }}
                      key={index}
                      className={s.panel}
                      onClick={() => setActiveFilter(tag)}
                    >
                      <div className={s.carouselItemTag}>
                        {t(`tags:${tag}`)}
                      </div>
                    </div>
                  ))}
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/389e4fa4-23d1-49cf-aefb-fcb5979e7a84.jpg")`,
                    backgroundSize: "cover", // make sure the image covers the div
                    backgroundRepeat: "no-repeat", // prevent the image from repeating
                    backgroundPosition: "center", // center the image in the div
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                  }}
                  className={s.panel}
                  onClick={() => setActiveFilter("latest")}
                >
                  <div className={s.carouselItem}>Latest</div>
                </div>
                {isSignedIn.value && (
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/389e4fa4-23d1-49cf-aefb-fcb5979e7a84.jpg")`,
                      backgroundSize: "cover", // make sure the image covers the div
                      backgroundRepeat: "no-repeat", // prevent the image from repeating
                      backgroundPosition: "center", // center the image in the div
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    className={s.panel}
                    onClick={() => setActiveFilter("favorites")}
                  >
                    <div className={s.carouselItem}>My Favorites</div>
                  </div>
                )}
              </Flicking>

              {activeFilter === "artists" ? (
                <DiscoverArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              ) : activeFilter === "monthlyArtist" ? (
                <DiscoverMonthlyArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              ) : activeFilter === "favorites" ? (
                <DiscoverMyLikedArtTab
                  username={username.value}
                  socialId={socialId.value}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  stopLoadImages={stopLoadImages}
                  loadImages={loadImages}
                  rowWidth={rowWidth}
                  activeTab={activeTab}
                  tagPlaceholder={tagPlaceholder}
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
                  fetchType={activeFilter}
                  sold={sold}
                  tagPlaceholder={tagPlaceholder}
                />
              )}
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
