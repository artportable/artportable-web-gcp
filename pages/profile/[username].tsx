import Main, { FullWidthBlock } from "../../app/components/Main/Main";
import Head from "next/head";
import clsx from "clsx";
import AboutMe from "../../app/components/AboutMe/AboutMe";
// import ProfileCoverPhoto from "../../app/components/ProfileCoverPhoto/ProfileCoverPhoto";
import {
  Tabs,
  Tab,
  Snackbar,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
// import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
// import ProfileComponent from "../../app/components/Profile/Profile";
import ProfileComponent from "../../app/components/Profile/ProfileNew";
// import ArtworkListItemDefined from "../../app/components/ArtworkListItemDefined/ArtworkListItemDefined";
import Image from "../../app/models/Image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EditArtworkDialog from "../../app/components/EditArtworkDialog/EditArtworkDialog";

import { useTranslation } from "next-i18next";
import { profileStyles } from "../../styles/[username]";
import { useGetArtworks } from "../../app/hooks/dataFetching/Artworks";
import {
  useGetSimilarPortfolios,
  useGetUserProfileTags,
  useGetUserProfile,
  useGetUserProfileSummary,
  useGetUserProfilePicture,
  useGetUser,
  useSetMonthlyArtist,
} from "../../app/hooks/dataFetching/UserProfile";
import React, { useContext, useEffect, useState } from "react";
import TabPanel from "../../app/components/TabPanel/TabPanel";
import { useGetProfileUser } from "../../app/hooks/dataFetching/useGetProfileUser";
// import SimilarPortfoliosSection from "../../app/components/SimilarPortfoliosSection/SimilarPortfoliosSection";
import { useMainWidth } from "../../app/hooks/useWidth";
import { getImageAsRows } from "../../app/utils/layoutUtils";
import { useTheme, Theme } from "@material-ui/core";
import { useRouter } from "next/router";
import ArtworkListItemDefinedSkeleton from "../../app/components/ArtworkListItemDefinedSkeleton/ArtworkListItemDefinedSkeleton";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { UPDATE_PROFILE_PICTURE } from "../../app/redux/actions/userActions";
import Button from "../../app/components/Button/Button";
import { useBreakpointDown } from "../../app/hooks/useBreakpointDown";
import Link from "next/link";
import { TokenContext } from "../../app/contexts/token-context";
import { LoadingContext } from "../../app/contexts/loading-context";
import { UserContext } from "../../app/contexts/user-context";
import {
  ActionType,
  // CategoryType,
  // trackGoogleAnalytics,
} from "../../app/utils/googleAnalytics";
import PurchaseRequestDialog from "../../app/components/PurchaseRequestDialog/PurchaseRequestDialog";
import usePostLikeEmail from "../../app/hooks/dataFetching/usePostLikeEmail";
import useRefreshToken from "../../app/hooks/useRefreshToken";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import DialogMonthlyUser from "../../app/components/MonthlyUserUpgrade/MonthlyUserUpgrade";
import DialogPortfolioPremium from "../../app/components/PortfolioPremiumUpgrade/PortfolioPremiumUpgrade";
import Offers from "../../app/components/ExclusiveOffers/Offers";
import BrushSharpIcon from "@mui/icons-material/BrushSharp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useGetStories } from "../../app/hooks/dataFetching/Stories";
import StoryComponent from "../../app/components/Story/StoryComponent";
import { Story } from "../../app/models/Story";
import { Membership } from "../../app/models/Membership";
import { DiscoverLikedArtTab } from "../../app/components/DiscoverLikedArt/DiscoverLikedArt";
import ArtworkListItemDefinedProfile from "../../app/components/ArtworkListItemDefined/ArtworkListItemDefinedProfile";
import ArtworkListSortable from "../../app/components/ArtworkListItemDefined/ArtworkListSortable";
import ProfileAnalytics from "../../analytics/ProfileAnalytics";

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  const { t } = useTranslation([
    "common",
    "profile",
    "upload",
    "header",
    "discover",
    "forms",
  ]);
  const s = profileStyles();
  const rowWidth = useMainWidth().regular;
  const theme: Theme = useTheme();
  const router = useRouter();
  const smScreenOrSmaller = useBreakpointDown("sm");
  const smPlusOrSmaller = useBreakpointDown("smPlus");
  const { isSignedIn, username, socialId, membership, phone, email } =
    useContext(UserContext);

  const profileUser = useGetProfileUser();
  const isMyProfile = profileUser === username.value;

  // const isMyProfile = username?.value === 'larsf' ? false : profileUser === username.value;

  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { articles, navBarItems, profile: staticUserProfile } = props;
  const canonicalURL = publicUrl + router.asPath;

  const [activeTab, setActiveTab] = useState(0);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadCoverSnackbarOpen, setUploadCoverSnackbarOpen] = useState(false);
  const [deleteArtworkSnackbarOpen, setDeleteArtworkSnackbarOpen] =
    useState(false);
  const [hasArtwork, setHasArtwork] = useState(false);
  const [editArtworkOpen, setEditArtworkOpen] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState(null);
  const [isReady, setIsReady] = useState(false);
  // const [sortOpen, setSortOpen] = useState(false);

  // const [hasStories, setHasStories] = useState(false);
  const stories = useGetStories(profileUser, username.value);
  const oddStories = stories?.data?.filter((_, index) => index % 2 === 0);
  const evenStories = stories?.data?.filter((_, index) => index % 2 !== 0);

  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const artworks = useGetArtworks(profileUser, username.value);
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const tags = useGetUserProfileTags(profileUser);
  const userData = useGetUser(profileUser);
  // const similarPortfolios = useGetSimilarPortfolios(profileUser);
  const userProfile = useGetUserProfile(profileUser, username.value);
  const chosenColor = userProfile?.data?.ChosenColor || "#FDF9F7";
  const chosenFont = userProfile?.data?.ChosenFont || "Gotham";
  const useLightText = chosenColor === "#000000";

  const [imageRows, setImageRows] = useState(null);
  const dispatch = useDispatch();
  const token = useContext(TokenContext);
  const [isFollowed, setFollow] = useState(userProfile?.data?.FollowedByMe);
  const { setLoading } = useContext(LoadingContext);

  const { likeEmail } = usePostLikeEmail();
  const { refreshToken } = useRefreshToken();
  const [loadMoreArtworks, setLoadMoreArtworks] = useState(true);
  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] =
    useState(false);
  const [purchaseRequestDialogData, setPurchaseRequestDialogData] = useState({
    title: "",
    creator: "",
    url: "",
    referTo: "",
    imageurl: "",
  });

  const { setMonthlyArtist } = useSetMonthlyArtist();
  const [isMonthlyUser, setIsMonthlyUser] = useState(userData?.data?.MonthlyUser);

  const handleSetMonthlyArtist = async (isMonthly) => {
    try {
      await setMonthlyArtist(token, profileUser, isMonthly);
      setIsMonthlyUser(isMonthly);
    } catch (error) {
      console.error("Failed to set monthly artist:", error);
    }
  };

  const isPremium = membership.value === 3;
  const isAdmin = membership.value > 4;
  const isProfileOwnerFree = !userData?.data?.ProductId || userData.data.ProductId < 1;
  const isProfileOwnerMini = userData?.data?.ProductId === 1;
  const shouldHideContent = isProfileOwnerFree && !isMyProfile;

  useEffect(() => {
    if (userData?.data?.MonthlyUser !== undefined) {
      setIsMonthlyUser(userData.data.MonthlyUser);
    }
  }, [userData]);

  useEffect(() => {
    if (!isReady) {
      setLoading(true);
    }
    if (isReady) {
      setLoading(false);
    }
  }, [isReady, userProfile?.data]);

  useEffect(() => {
    if (!isSignedIn.isPending && !userProfile.isLoading) {
      setIsReady(true);
    }
  }, [isSignedIn, userProfile.isLoading]);

  // Analytics: Track profile views
  useEffect(() => {
    const trackProfileView = async () => {
      if (!profileUser || !apiBaseUrl) return;
      
      // Don't track if viewing own profile
      if (isMyProfile) return;

      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('artportable_session_id');
        if (!sessionId) {
          sessionId = 'session_' + Math.random().toString(36).substring(2) + '_' + Date.now();
          localStorage.setItem('artportable_session_id', sessionId);
        }

        // Track the profile view
        const response = await fetch(`${apiBaseUrl}/api/profileviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileUsername: profileUser,
            sessionId: sessionId
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Profile view tracked:', result);
        }
      } catch (error) {
        console.log('Analytics tracking failed:', error);
        // Fail silently - don't disrupt user experience
      }
    };

    // Track after component is ready and profile data is loaded
    if (isReady && profileUser && !userProfile.isLoading) {
      trackProfileView();
    }
  }, [isReady, profileUser, isMyProfile, apiBaseUrl, userProfile.isLoading]);

  const onUpdateProfilePicture = (profilePicture: any) => {
    dispatch({
      type: UPDATE_PROFILE_PICTURE,
      profilePicture: profilePicture,
    });
  };

  useEffect(() => {
    setFollow(userProfile?.data?.FollowedByMe);
  }, [userProfile?.data?.FollowedByMe]);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      if (url.includes(`/profile/@`)) {
        setImageRows(null);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeStart);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("refresh")) {
      router.reload();
      sessionStorage.removeItem("refresh");
    }
  }, []);

  useEffect(() => {
    const primaryImages = artworks?.data?.map((a) => a.PrimaryFile);
    if (imageRows === null) {
      const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
      if (rows) {
        setImageRows(rows);
      }
    }
    setHasArtwork(artworks?.data !== null && artworks?.data?.length > 0);
  }, [artworks.data, imageRows]);

  useEffect(() => {
    const primaryImages = artworks?.data?.map((a) => a.PrimaryFile);
    if (imageRows !== null) {
      const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
      if (rows) {
        setImageRows(rows);
      }
    }
  }, [rowWidth]);

  function onLikeClick(artwork, isLike) {
    likeEmail(artwork, isLike);
  }

  function handleTabChange(_, newValue) {
    setActiveTab(newValue);
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadSnackbarOpen(false);
  };

  const handleCoverSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadCoverSnackbarOpen(false);
  };
  const handleDeleteArtworkSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteArtworkSnackbarOpen(false);
  };

  function updateImage(blob, width: number, height: number, type: string) {
    refreshToken()
      .then(() =>
        fetch(`${apiBaseUrl}/api/images?w=${width}&h=${height}`, {
          method: "POST",
          headers: {
            "Content-Type": "image/jpeg",
            Authorization: `Bearer ${token}`,
          },
          body: blob,
        })
      )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.text();
      })
      .then((name) => {
        const url =
          type === "profile"
            ? `${apiBaseUrl}/api/profile/${username.value}/profilepicture?filename=${name}`
            : `${apiBaseUrl}/api/profile/${username.value}/coverphoto?filename=${name}`;

        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "image/jpeg",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw response;
            }
            switch (type) {
              case "profile":
                onUpdateProfilePicture(name);
                setUploadSnackbarOpen(true);
                break;
              default:
                userProfile.mutate();
                setUploadCoverSnackbarOpen(true);
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const openEditArtworkDialog = (artwork) => {
    setArtworkToEdit(artwork);
    setEditArtworkOpen(true);
  };

  const onEditArtworkClose = async (promise) => {
    if (promise) {
      try {
        setEditArtworkOpen(false);
        setLoading(true);
        await promise;
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      artworks.mutate();
    } else {
      setEditArtworkOpen(false);
    }
  };

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function onPurchaseRequestClick(
    title: string,
    creator: string,
    artworkId: string,
    referTo: string,
    imageurl: string
  ) {
    const url = publicUrl + "/art/" + artworkId;
    referTo = userProfileSummary.data.SocialId;

    setPurchaseRequestDialogData({
      title: title,
      creator: creator,
      url: url,
      referTo: referTo,
      imageurl: imageurl,
    });
    togglePurchaseRequestDialog();
  }

  const [openMonthlyDialogOpen, setOpenMonthlyDialogOpen] = useState(false);

  function toggleMonthlyDialog() {
    setOpenMonthlyDialogOpen(!openMonthlyDialogOpen);
  }

  const [openPortfolioPremium, setOpenPortfolioPremium] = useState(false);

  function togglePortfolioPremiumDialog() {
    setOpenPortfolioPremium(!openPortfolioPremium);
  }

  const [numberExists, setNumberExists] = useState(true);

  const userProfileUrl = `https://artportable.com/profile/@${staticUserProfile?.Username}`;

  const loadImages = () => {
    setLoadMoreArtworks(true);
  };

  const stopLoadImages = () => {
    setLoadMoreArtworks(false);
  };

  // Analytics tab shows for profile owners and admins (index 2 right after About Me)
  const analyticsTabIndex = (isMyProfile || isAdmin) ? 2 : -1;
  
  // Adjust other tab indices based on whether analytics is shown
  const storiesTabIndex = stories?.data?.length > 0 ? ((isMyProfile || isAdmin) ? 3 : 2) : -1;
  const likedArtTabIndex = storiesTabIndex !== -1 ? storiesTabIndex + 1 : ((isMyProfile || isAdmin) ? 3 : 2);
  const articlesTabIndex =
    articles && articles?.length > 0
      ? likedArtTabIndex + 1
      : -1;

  return (
    <Main
      navBarItems={navBarItems}
      fullWidth={false}
      noHeaderPadding={true}
      paddingForTrialBanner={!isSignedIn.value}
    >
      <Head>
        <title>
          {userProfile?.data?.Name
            ? `${userProfile.data.Name} ${userProfile.data.Surname}`
            : profileUser}
          {" - Artportable"}
        </title>
        <meta
          name="description"
          content={userProfile?.data?.Headline || ""}
        />
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <div className={s.profileTopMargin}></div>
      <ProfileComponent
        userProfile={userProfile}
        userProfilePicture={
          isMyProfile ? profilePicture : userProfileSummary.data?.ProfilePicture
        }
        onUpdateProfilePicture={updateImage}
        isMyProfile={isMyProfile}
        isPremium={isPremium}
        linkToProfile={false}
        isFollowed={isFollowed}
        userProfileUrl={userProfileUrl}
        staticUserProfile={staticUserProfile}
        chosenColor={chosenColor}
        chosenFont={chosenFont}
        useLightText={useLightText}
      ></ProfileComponent>

      {isReady && (
        <>
          <div>
            <DialogMonthlyUser
              open={openMonthlyDialogOpen}
              onClose={toggleMonthlyDialog}
            />
            {isAdmin && ( 
              <div style={{marginBottom: "10px", fontSize: "30px"}}>
                <a href={`mailto:${userData?.data?.Email}`}>{userData?.data?.Email}</a>
              </div>
            )}


            
            <DialogPortfolioPremium
              open={openPortfolioPremium}
              onClose={togglePortfolioPremiumDialog}
              numberExists={numberExists}
            />
            {isAdmin && (
              <Button
                variant="contained"
                color={isMonthlyUser ? "secondary" : "primary"}
                onClick={() => handleSetMonthlyArtist(!isMonthlyUser)}
              >
                {isMonthlyUser
                  ? "Remove Monthly Artist"
                  : "Set as Monthly Artist"}
              </Button>
            )}
            {hasArtwork ? (
              <div className={s.tabsContainer}>
                {/* If changing height of Tabs component, also change height of id="CoverTabs" element in ProfileNew.tsx */}
                <Tabs
                  className={s.tabs}
                  value={activeTab}
                  onChange={handleTabChange}
                  centered
                  variant="scrollable"
                  style={
                    {
                      // backgroundColor: chosenColor, // Not filling full width of screen.
                    }
                  }
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: !useLightText ? "#000000DE" : "white", // Same dark color as selected tab text.
                    },
                  }}
                >
                  <Tab
                    className={clsx(s.tab, {})}
                    label={t("profile:portfolio")}
                    {...a11yProps(t("profile:portfolio"))}
                  />
                  <Tab
                    className={clsx(s.tab, {})}
                    label={t("profile:aboutMe")}
                    {...a11yProps(t("profile:aboutMe"))}
                  />

                  {/* Analytics tab - for profile owners and admins (index 2) */}
                  {(isMyProfile || isAdmin) && (
                    <Tab
                      className={clsx(s.tab, {})}
                      label={t("profile:analytics")}
                      {...a11yProps(analyticsTabIndex)}
                    />
                  )}

                  {stories?.data?.length > 0 && (
                    <Tab
                      className={clsx(s.tab, {})}
                      label={t("profile:stories")}
                      {...a11yProps(storiesTabIndex)}
                    />
                  )}

                  {/* Liked Art tab */}
                  <Tab
                    className={clsx(s.tab, {})}
                    label={t("discover:likedArt")}
                    {...a11yProps(likedArtTabIndex)}
                  />

                  {/* Conditionally render the articles tab */}
                  {articles && articles.length > 0 && (
                    <Tab
                      className={clsx(s.tab, {})}
                      label={t("profile:articles")}
                      {...a11yProps(articlesTabIndex)}
                    />
                  )}
                </Tabs>
                <Box paddingY={1}>
                  <TabPanel value={activeTab} index={0}>
                    {shouldHideContent ? null : isProfileOwnerFree ? (
                      <div className={s.portfolioContainer} style={{ textAlign: 'center', padding: '2rem' }}>
                        <Typography variant="h6" gutterBottom>
                          {t("profile:upgradeToShowArtworks")}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {t("profile:upgradeToShowArtworksDescription")}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => router.push('/upgrade')}
                          className={s.upgradeButton}
                          style={{ marginTop: '1rem' }}
                        >
                          {t("profile:upgradeNow")}
                        </Button>
                      </div>
                    ) : (
                      <>
                        {isMyProfile && isPremium && (
                          <div style={{ marginBottom: "0px" }}>
                            <ArtworkListSortable
                              items={artworks.data}
                              editAction={
                                isMyProfile ? openEditArtworkDialog : () => {}
                              }
                              t={t}
                            />
                            <EditArtworkDialog
                              artwork={artworkToEdit}
                              open={editArtworkOpen}
                              onClose={onEditArtworkClose}
                            />
                          </div>
                        )}
                        {(!isMyProfile || !isPremium) && (
                          <div className={s.portfolioContainer}>
                            {imageRows &&
                              imageRows.map((row: Image[], i) => {
                                // For Mini plan users, only show first 3 artworks
                                if (isProfileOwnerMini) {
                                  // Count total artworks shown so far
                                  const artworksShown = imageRows
                                    .slice(0, i)
                                    .reduce((total, r) => total + r.length, 0);
                                  
                                  // If we've shown 3 or more artworks, don't show this row
                                  if (artworksShown >= 3) return null;
                                  
                                  // For the last row that will be shown, only show enough artworks to reach 3 total
                                  if (artworksShown + row.length > 3) {
                                    row = row.slice(0, 3 - artworksShown);
                                  }
                                }
                                
                                return (
                                  <div className={s.portfolioRow} key={i}>
                                    {row.map((image) => {
                                      let artwork = artworks.data?.find(
                                        (a) => a.PrimaryFile.Name === image.Name
                                      );

                                      if (artwork) {
                                        return (
                                          <ArtworkListItemDefinedProfile
                                            key={image.Name}
                                            width={
                                              smScreenOrSmaller ? "100%" : image.Width
                                            }
                                            height={
                                              smScreenOrSmaller
                                                ? "auto"
                                                : image.Height
                                            }
                                            artwork={artwork}
                                            topActions={
                                              isMyProfile && (
                                                <>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <div>
                                                      <Button
                                                        aria-label="edit"
                                                        className={s.editButton}
                                                        onClick={() =>
                                                          openEditArtworkDialog(
                                                            artwork
                                                          )
                                                        }
                                                        startIcon={<BrushSharpIcon />}
                                                      >
                                                        {t("profile:editButton")}
                                                      </Button>
                                                    </div>
                                                    <div>
                                                      {artwork?.IsBoosted ===
                                                      false ? (
                                                        <Button
                                                          aria-label="boost"
                                                          className={s.boostButton}
                                                          onClick={() => {
                                                            router.push(
                                                              `/checkoutboost?${artwork.Id}`
                                                            );
                                                          }}
                                                          startIcon={
                                                            <RocketLaunchIcon />
                                                          }
                                                        >
                                                          {t(
                                                            "profile:promoteArtwork"
                                                          )}
                                                        </Button>
                                                      ) : (
                                                        <Button
                                                          aria-label="boost"
                                                          className={s.boostButton}
                                                          disabled
                                                          startIcon={
                                                            <RocketLaunchIcon />
                                                          }
                                                        >
                                                          {t(
                                                            "profile:promotedArtwork"
                                                          )}
                                                        </Button>
                                                      )}
                                                    </div>
                                                  </div>
                                                </>
                                              )
                                            }
                                            onPurchaseRequestClick={
                                              onPurchaseRequestClick
                                            }
                                            purchaseRequestAction={
                                              ActionType.PURCHASE_REQUEST_LIST_PROFILE
                                            }
                                            onLikeClick={onLikeClick}
                                            indexPage={false}
                                          />
                                        );
                                      }
                                    })}
                                  </div>
                                );
                              })}
                            {isProfileOwnerMini && (
                              <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <Typography variant="h6" gutterBottom>
                                  {t("profile:upgradeToShowMoreArtworks")}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                  {t("profile:upgradeToShowMoreArtworksDescription")}
                                </Typography>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => router.push('/upgrade')}
                                  className={s.upgradeButton}
                                  style={{ marginTop: '1rem' }}
                                >
                                  {t("profile:upgradeNow")}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </TabPanel>
                  <TabPanel value={activeTab} index={1}>
                    <AboutMe
                      userProfile={userProfile}
                      userProfilePicture={
                        isMyProfile
                          ? profilePicture
                          : userProfileSummary.data?.ProfilePicture
                      }
                      isMyProfile={isMyProfile}
                      tags={tags.data}
                      onUpdateProfilePicture={updateImage}
                    ></AboutMe>
                  </TabPanel>

                  {/* Analytics TabPanel - for profile owners and admins (index 2) */}
                  {(isMyProfile || isAdmin) && (
                    <TabPanel value={activeTab} index={analyticsTabIndex}>
                      <ProfileAnalytics username={profileUser} t={t} />
                    </TabPanel>
                  )}

                  {/* TabPanels */}
                  {stories?.data?.length > 0 && (
                    <TabPanel value={activeTab} index={storiesTabIndex}>
                      {/* Content for stories */}
                      {isMyProfile &&
                        membership.value >= Membership.PortfolioPremium && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "20px",
                            }}
                          >
                            <Link href="/upload-story">
                              <a>
                                <Button
                                  aria-label="upload story"
                                  variant="contained"
                                  style={{ backgroundColor: "#ffd700" }}
                                  rounded
                                >
                                  {t("profile:uploadStory")}
                                </Button>
                              </a>
                            </Link>
                          </div>
                        )}
                      {stories?.data?.length > 0 ? (
                        <Grid justifyContent="center" container spacing={2}>
                          {!smPlusOrSmaller ? (
                            <>
                              <Grid
                                item
                                style={{
                                  flexBasis: "auto",
                                  marginRight: "1.5rem",
                                }}
                              >
                                <div className={s.stories}>
                                  {oddStories?.map((story: Story) => (
                                    <StoryComponent
                                      isIndex={false}
                                      story={story}
                                      key={story.Id}
                                    />
                                  ))}
                                </div>
                              </Grid>
                              <Grid item style={{ flexBasis: "auto" }}>
                                <div className={s.stories}>
                                  {evenStories?.map((story: Story) => (
                                    <StoryComponent
                                      isIndex={false}
                                      story={story}
                                      key={story.Id}
                                    />
                                  ))}
                                </div>
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={12}>
                                <div className={s.stories}>
                                  {stories?.data?.map((story: Story) => (
                                    <StoryComponent
                                      isIndex={false}
                                      story={story}
                                      key={story.Id}
                                    />
                                  ))}
                                </div>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      ) : (
                        <div></div>
                      )}
                    </TabPanel>
                  )}
                  {/* Liked Art TabPanel */}
                  <TabPanel value={activeTab} index={likedArtTabIndex}>
                    <DiscoverLikedArtTab
                      socialId={socialId.value}
                      rowWidth={rowWidth}
                      loadMore={loadMoreArtworks}
                      loadImages={loadImages}
                      stopLoadImages={stopLoadImages}
                      activeTab={activeTab}
                      isMyProfile={isMyProfile}
                    />
                  </TabPanel>
                  {articles && articles?.length > 0 && (
                    <TabPanel value={activeTab} index={articlesTabIndex}>
                      {articles && (
                        <div className={s.flex}>
                          {articles.map((article, key) => (
                            <Link
                              href={`/konstnaersportraett/${article.slug}`}
                              key={key}
                            >
                              <a>
                                <Paper className={s.wrapper}>
                                  <div>
                                    <img
                                      src={
                                        article?.coverImage?.formats?.small?.url
                                      }
                                      className={s.coverImage}
                                      alt="cover image"
                                    />
                                  </div>
                                  <div className={s.textContent}>
                                    <div>
                                      {article.published_at.slice(0, -14)}
                                    </div>
                                    <Typography component="h2" variant={"h2"}>
                                      <Box
                                        fontFamily="LyonDisplay"
                                        fontWeight="fontWeightMedium"
                                        className={s.headline}
                                      >
                                        {article.title}{" "}
                                        {router.locale !== article.locale
                                          ? "(In Swedish)"
                                          : ""}
                                      </Box>
                                    </Typography>
                                    <Typography variant={"subtitle1"}>
                                      {article.description}
                                    </Typography>
                                  </div>
                                  <div className={s.line}></div>
                                </Paper>
                              </a>
                            </Link>
                          ))}
                        </div>
                      )}
                    </TabPanel>
                  )}
                </Box>
              </div>
            ) : (
              <div className={s.tabsContainer}>
                <Tabs
                  value={activeTab}
                  centered
                  className={s.tabs}
                  onChange={handleTabChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: !useLightText ? "#000000DE" : "white", // Same dark color as selected tab text.
                    },
                  }}
                >
                  <Tab
                    className={clsx(s.tab, {
                      [s.tabLight]: useLightText,
                    })}
                    label={t("profile:aboutMe")}
                    {...a11yProps(t("profile:aboutMe"))}
                  />
                </Tabs>
                <Box paddingY={1}>
                  <TabPanel value={activeTab} index={0}>
                    <AboutMe
                      userProfile={userProfile}
                      userProfilePicture={
                        isMyProfile
                          ? profilePicture
                          : userProfileSummary.data?.ProfilePicture
                      }
                      tags={tags.data}
                      onUpdateProfilePicture={updateImage}
                      isMyProfile={isMyProfile}
                    />
                  </TabPanel>
                  {isMyProfile && (
                    <TabPanel value={activeTab} index={1}>
                      <Offers />
                    </TabPanel>
                  )}
                </Box>
              </div>
            )}
          </div>
          <Snackbar
            open={uploadSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              variant="filled"
              severity="success"
            >
              {t("profile:profilePictureUpdated")}
            </Alert>
          </Snackbar>
          <Snackbar
            open={uploadCoverSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleCoverSnackbarClose}
          >
            <Alert
              onClose={handleCoverSnackbarClose}
              variant="filled"
              severity="success"
            >
              {t("profile:coverPhotoUpdated")}
            </Alert>
          </Snackbar>
          <Snackbar
            open={deleteArtworkSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleDeleteArtworkSnackbarClose}
          >
            <Alert
              onClose={handleDeleteArtworkSnackbarClose}
              variant="filled"
              severity="success"
            >
              {t("profile:deleteArtworkSuccess")}
            </Alert>
          </Snackbar>
        </>
      )}
    </Main>
  );
}

export async function getServerSideProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const split = params.username.split("@");
  const username = split.length > 1 ? split[1] : null;
  const url = new URL(
    `${apiBaseUrl}/api/profile/${encodeURIComponent(username)}`
  );

  var articles = [];
  let articleResponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/articles?artist=${username}&_locale=${locale}`
  );
  if (articleResponse.status === 200) {
    articles = await articleResponse.json();
  }
  try {
    const profileResponse = await fetch(url.href);
    const profile = await profileResponse.json();
    const navBarItems = await getNavBarItems();
    return {
      props: {
        articles: articles,
        navBarItems: navBarItems,
        profile: profile,
        locale: locale,
        ...(await serverSideTranslations(locale, [
          "common",
          "header",
          "footer",
          "profile",
          "tags",
          "art",
          "upload",
          "support",
          "plans",
          "discover",
          "forms",
        ])),
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      articles: articles,
      locale: locale,
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "profile",
        "tags",
        "art",
        "upload",
        "support",
        "plans",
        "discover",
        "forms",
      ])),
    },
  };
}
