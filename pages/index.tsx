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
import CloseIcon from "@mui/icons-material/Close";
import { FlickingError, ERROR_CODE } from "@egjs/flicking";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { tagBackgrounds } from "../public/panelBackgrounds/panelBackgrounds";

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
  const [isAnimating, setIsAnimating] = useState(false);
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

  const preferredOrder = ["abstract", "pop-culture", "nude", "dogs"];

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

  const tags = useGetTags();
  const [activeFilter, setActiveFilter] = useState("trending");

  const knownFetchTypes = [
    "trending",
    "latest",
    "top",
    "artists",
    "likedbyme",
    "curated",
  ];

  const tagPlaceholder = knownFetchTypes.includes(activeFilter)
    ? "Originalkonst"
    : activeFilter;

  const [clickedFilter, setClickedFilter] = useState(null);

  const handleFilterClick = async (filter, index) => {
    setShowTags(false);
    if (isAnimating) return;

    let targetFilter = filter;
    let targetIndex = index;

    if (clickedFilter === filter) {
      targetFilter = "trending";
      targetIndex = 0;
    }

    flickingRef.current.moveTo(targetIndex, 0).catch((err) => {
      setClickEnabled(true);
    });
    setActiveFilter(targetFilter);
    setClickedFilter(targetFilter);
    setCurrentIndex(targetIndex);
  };

  const handlePrevClick = () => {
    if (isAnimating) return;
    if (flickingRef.current && clickEnabled) {
      flickingRef.current.prev();
    }
  };

  const handleNextClick = () => {
    if (isAnimating) return;
    if (flickingRef.current && clickEnabled) {
      flickingRef.current.next();
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  function handleRemoveClick() {
    setActiveFilter("trending");
    setClickedFilter("trending");
    setCurrentIndex(0);
    setResetToTrending(true);
  }

  const [resetToTrending, setResetToTrending] = useState(false);

  const [showTags, setShowTags] = useState(false);

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
          {/*
            <AdDialog
              openAdDialog={openAdDialog}
              setOpenAdDialog={setOpenAdDialog}
              onClose={toggleAdDialog}
            />
      */}
          <div className={s.discoverContainer}>
            <div className={s.flickingArrow}>
              <span onClick={handlePrevClick}>
                <ArrowBackIosRoundedIcon
                  className={s.flickingArrowPrev}
                  style={{ fontSize: "medium" }}
                />
              </span>

              <div>
                <span onClick={handleNextClick}>
                  <ArrowForwardIosRoundedIcon
                    className={s.flickingArrowNext}
                    style={{ fontSize: "medium" }}
                  />
                </span>
              </div>
            </div>
            <div className={s.flickingArrowExpand}>
              <span>
                <MoreHorizIcon
                  className={s.expandMoreLess}
                  style={{ fontSize: "35px" }}
                />
              </span>
              <span className={s.expandMoreWrapper}>
                <span onClick={() => setShowTags(!showTags)}>
                  <MoreHorizIcon
                    className={s.expandMore}
                    style={{ fontSize: "35px" }}
                  />
                </span>
              </span>
            </div>
            <Box paddingTop={4}>
              <Flicking
                ref={flickingRef}
                gap={6}
                circular={true}
                align="center"
                onMoveStart={() => setIsAnimating(true)}
                onMoveEnd={() => setIsAnimating(false)}
                initialIndex={0}
                moveType="snap"
                className={s.flickingWrapper}
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/d771b165-68bc-499d-8beb-16c49d89375e.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "left",
                    position: "relative",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "trending" ? s.activePanel : ""
                  }`}
                  onClick={() => {
                    handleFilterClick("trending", 0);
                  }}
                >
                  <div className={s.carouselItem}>
                    {t("discover:trendingArt")}
                  </div>
                </div>

                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/image_6483441-32.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "left",
                    position: "relative",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "latest" ? s.activePanel : ""
                  }`}
                  onClick={() => {
                    handleFilterClick("latest", 1);
                  }}
                >
                  {clickedFilter === "latest" && (
                    <button
                      className={s.closeButton}
                      onClick={handleRemoveClick}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <div className={s.carouselItem}>
                    {t("discover:latestArt")}
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/cd99b4ca-e1b2-4c8b-a8f5-4a459ac3b5a2.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "left",
                    position: "relative",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "curated" ? s.activePanel : ""
                  }`}
                  onClick={() => {
                    handleFilterClick("curated", 2);
                  }}
                >
                  {clickedFilter === "curated" && (
                    <button
                      className={s.closeButton}
                      onClick={handleRemoveClick}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <div className={s.carouselItem}>
                    {t("discover:highlights")}
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/8b9dbcea-9d75-4ae5-9bb3-45f5490faa60.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "repeat",
                    backgroundPosition: "left",
                    position: "relative",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "top" ? s.activePanel : ""
                  }`}
                  onClick={() => {
                    handleFilterClick("top", 3);
                  }}
                >
                  {clickedFilter === "top" && (
                    <button
                      className={s.closeButton}
                      onClick={handleRemoveClick}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <div className={s.carouselItem}>{t("discover:topArt")}</div>
                </div>

                {tags.data &&
                  [
                    ...tags.data
                      .filter((tag) => preferredOrder.includes(tag))
                      .sort(
                        (a, b) =>
                          preferredOrder.indexOf(a) - preferredOrder.indexOf(b)
                      ),
                    ...tags.data.filter((tag) => !preferredOrder.includes(tag)),
                  ].map((tag, index) => (
                    <div
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${
                          tagBackgrounds[tag] || tagBackgrounds.default
                        }`,
                        backgroundSize: "cover",
                        backgroundRepeat: "repeat",
                        backgroundPosition: "left",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                        position: "relative",
                      }}
                      key={index}
                      className={`${s.panel} ${
                        activeFilter === `${tag}` ? s.activePanel : ""
                      }`}
                      onClick={() => {
                        console.log(index + 4);
                        handleFilterClick(tag, index + 4);
                      }}
                    >
                      {activeFilter === `${tag}` && (
                        <button
                          className={s.closeButton}
                          onClick={handleRemoveClick}
                        >
                          <CloseIcon />
                        </button>
                      )}

                      <div className={s.carouselItemTag}>
                        {t(`tags:${tag}`)}
                      </div>
                    </div>
                  ))}

                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/f8f967a9-1b47-4318-b3fb-2349093b33ca.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "artists" ? s.activePanel : ""
                  }`}
                  onClick={() => handleFilterClick("artists", 74)}
                >
                  {clickedFilter === "artists" && (
                    <button
                      className={s.closeButton}
                      onClick={handleRemoveClick}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <div className={s.carouselItem}>{t("discover:artists")}</div>
                </div>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/701e6927-68ec-40d9-942b-e84e8f8a881e.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                  className={`${s.panel} ${
                    clickedFilter === "monthlyArtist" ? s.activePanel : ""
                  }`}
                  onClick={() => handleFilterClick("monthlyArtist", 75)}
                >
                  {clickedFilter === "monthlyArtist" && (
                    <button
                      className={s.closeButton}
                      onClick={handleRemoveClick}
                    >
                      <CloseIcon />
                    </button>
                  )}
                  <div className={s.carouselItem}>
                    {t("discover:monthlyArtist")}
                  </div>
                </div>
                {isSignedIn.value && (
                  <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://artportableprod.blob.core.windows.net/artportable-prod/images/bc218e0d-d918-470b-96e6-23980ba3fb9e.jpg")`,
                      backgroundSize: "cover", // make sure the image covers the div
                      backgroundRepeat: "no-repeat", // prevent the image from repeating
                      backgroundPosition: "center", // center the image in the div
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    }}
                    className={`${s.panel} ${
                      clickedFilter === "likedbyme" ? s.activePanel : ""
                    }`}
                    onClick={() => handleFilterClick("likedbyme", 76)}
                  >
                    {" "}
                    {clickedFilter === "likedbyme" && (
                      <button
                        className={s.closeButton}
                        onClick={handleRemoveClick}
                      >
                        <CloseIcon />
                      </button>
                    )}
                    <div className={s.carouselItem}>
                      {t("discover:myLikedArt")}
                    </div>
                  </div>
                )}
              </Flicking>

              {showTags && (
                <div className={s.expanedTagsWrapper}>
                  <div className={s.expanedTags}>
                    {tags.data &&
                      [
                        ...tags.data
                          .filter((tag) => preferredOrder.includes(tag))
                          .sort(
                            (a, b) =>
                              preferredOrder.indexOf(a) -
                              preferredOrder.indexOf(b)
                          ),
                        ...tags.data.filter(
                          (tag) => !preferredOrder.includes(tag)
                        ),
                      ].map((tag, index) => (
                        <div
                          style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), ${
                              tagBackgrounds[tag] || tagBackgrounds.default
                            }`,
                            backgroundSize: "cover",
                            backgroundRepeat: "repeat",
                            backgroundPosition: "left",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            position: "relative",
                          }}
                          className={`${s.tagDialog} ${
                            activeFilter === `${tag}`
                              ? s.activePanelTagsDrop
                              : ""
                          }`}
                          key={index}
                          onClick={() => {
                            handleFilterClick(tag, index + 4);
                            setShowTags(false);
                          }}
                        >
                          {t(`tags:${tag}`)}
                        </div>
                      ))}
                  </div>
                </div>
              )}

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
              ) : activeFilter === "curated" ? (
                <DiscoverHighLightsTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={3}
                  fetchType={activeFilter}
                  tagPlaceholder={tagPlaceholder}
                />
              ) : activeFilter === "top" ? (
                <DiscoverTopArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={2}
                  fetchType={activeFilter}
                  tagPlaceholder={tagPlaceholder}
                />
              ) : activeFilter === "likedbyme" ? (
                <DiscoverMyLikedArtTab
                  username={username.value}
                  socialId={socialId.value}
                  sold={sold}
                  loadMore={loadMoreArtworks}
                  stopLoadImages={stopLoadImages}
                  loadImages={loadImages}
                  rowWidth={rowWidth}
                  activeTab={4}
                  tagPlaceholder={tagPlaceholder}
                  fetchType={activeFilter}
                />
              ) : (
                <DiscoverTrendingArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                  loadMore={loadMoreArtworks}
                  loadImages={loadImages}
                  stopLoadImages={stopLoadImages}
                  activeTab={0}
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
