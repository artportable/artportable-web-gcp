
import AboutMe from "../AboutMe/AboutMe";
import { Tabs, Tab, Typography, Snackbar, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import Image from "../../models/Image";
import EditArtworkDialog from "../EditArtworkDialog/EditArtworkDialog";

import { useTranslation } from "next-i18next";
import { useGetArtworks } from "../../hooks/dataFetching/Artworks";
import {
  useGetSimilarPortfolios,
  useGetUserProfileTags,
  useGetUserProfile,
  useGetUserProfileSummary,
  useGetUserProfilePicture,
} from "../../hooks/dataFetching/UserProfile";
import React, { useContext, useEffect, useState } from "react";
import TabPanel from "../TabPanel/TabPanel";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import { useMainWidth } from "../../hooks/useWidth";
import { getImageAsRows } from "../../utils/layoutUtils";
import { useTheme, Theme } from "@material-ui/core";
import { useRouter } from "next/router";
import ArtworkListItemDefinedSkeleton from "../../components/ArtworkListItemDefinedSkeleton/ArtworkListItemDefinedSkeleton";
import { useDispatch } from "react-redux";
import { UPDATE_PROFILE_PICTURE } from "../../redux/actions/userActions";
import Button from "../../components/Button/Button";
import { useBreakpointDown } from "../../hooks/useBreakpointDown";
import Link from "next/link";
import { TokenContext } from "../../contexts/token-context";
import { LoadingContext } from "../../contexts/loading-context";
import { UserContext } from "../../contexts/user-context";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import PurchaseRequestDialog from "../PurchaseRequestDialog/PurchaseRequestDialog";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import useRefreshToken from "../../hooks/useRefreshToken";
import Offers from "../ExclusiveOffers/Offers";
import BrushSharpIcon from "@mui/icons-material/BrushSharp";
import { styles } from "./profileContent.css"


function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  const { t } = useTranslation(["common", "profile", "upload", "header"]);
  const s = styles();
  const rowWidth = useMainWidth().regular;
  const theme: Theme = useTheme();
  const smScreenOrSmaller = useBreakpointDown("sm");
  const { isSignedIn, username, socialId } =
    useContext(UserContext);
  const profileUser = useGetProfileUser();
  const isMyProfile = profileUser === username.value;
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { articles } = props;

  const [activeTab, setActiveTab] = useState(0);
  const [hasArtwork, setHasArtwork] = useState(false);
  const [editArtworkOpen, setEditArtworkOpen] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadCoverSnackbarOpen, setUploadCoverSnackbarOpen] = useState(false);
  const [deleteArtworkSnackbarOpen, setDeleteArtworkSnackbarOpen] =
    useState(false);

  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const artworks = useGetArtworks(profileUser, username.value);
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const tags = useGetUserProfileTags(profileUser);
  const userProfile = useGetUserProfile(profileUser, username.value);

  const [imageRows, setImageRows] = useState(null);
  const dispatch = useDispatch();
  const token = useContext(TokenContext);
  const { setLoading } = useContext(LoadingContext);

  const { like } = usePostLike();
  const { refreshToken } = useRefreshToken();

  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] =
    useState(false);
  const [purchaseRequestDialogData, setPurchaseRequestDialogData] = useState({
    title: "",
    creator: "",
    url: "",
    referTo: "",
    imageurl: "",
  });

  useEffect(() => {
    if (!isReady) {
      setLoading(true);
    }
    if (isReady) {
      setLoading(false);
    }
  }, [isReady]);

  useEffect(() => {
    if (!isSignedIn.isPending && !userProfile.isLoading) {
      setIsReady(true);
    }
  }, [isSignedIn, userProfile.isLoading]);

  const onUpdateProfilePicture = (profilePicture: any) => {
    dispatch({
      type: UPDATE_PROFILE_PICTURE,
      profilePicture: profilePicture,
    });
  };

  // useEffect(() => {
  //   const handleRouteChangeStart = (url) => {
  //     if (url.includes(`/profile/@`)) {
  //       setImageRows(null);
  //     }
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChangeStart);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChangeStart);
  //   };
  // }, []);


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

  function onLikeClick(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId.value, token);
  }

  function handleTabChange(_, newValue) {
    setActiveTab(newValue);
  }

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
    // if (isSignedIn.value) {
    //   const originalRedirect = {
    //     pathname: "/messages",
    //     query: {
    //       artwork: encodeURIComponent(JSON.stringify({
    //         title: title,
    //         creator: creator,
    //         url: url,
    //         imageurl: imageurl
    //       })),
    //       referTo: referTo
    //     }
    //   }
    //   router.push(originalRedirect);
    // } else {
    setPurchaseRequestDialogData({
      title: title,
      creator: creator,
      url: url,
      referTo: referTo,
      imageurl: imageurl,
    });
    togglePurchaseRequestDialog();
  }

  return (

    <>
      {hasArtwork ? (
        <div className={s.tabsContainer}>
          <Tabs
            className={s.tabs}
            value={activeTab}
            onChange={handleTabChange}
            centered
          >
            <Tab
              className={s.tab}
              label={t("profile:portfolio")}
              {...a11yProps(t("profile:portfolio"))}
            />
            <Tab
              className={s.tab}
              label={t("profile:aboutMe")}
              {...a11yProps(t("profile:aboutMe"))}
            />
            {
              articles && articles.length > 0 && (
                <Tab
                  className={s.tab}
                  label={t("profile:articles")}
                  {...a11yProps(t("profile:articles"))}
                />
              )

              // Grid i första div sen flexbox i nästa
            }

          </Tabs>
          <Box paddingY={1}>
            <TabPanel value={activeTab} index={0}>
              <div className={s.portfolioContainer}>
                {imageRows &&
                  imageRows.map((row: Image[], i) => (
                    <div className={s.portfolioRow} key={i}>
                      {row.map((image) => {
                        let artwork = artworks.data?.find(
                          (a) => a.PrimaryFile.Name === image.Name
                        );

                        if (artwork) {
                          return (
                            <ArtworkListItemDefined
                              key={image.Name}
                              width={
                                smScreenOrSmaller ? "100%" : image.Width
                              }
                              height={
                                smScreenOrSmaller ? "auto" : image.Height
                              }
                              artwork={artwork}
                              topActions={
                                isMyProfile ? (
                                  <>
                                    <Button
                                      aria-label="edit"
                                      className={s.editButton}
                                      variant="contained"
                                      color="red"
                                      rounded
                                      onClick={() =>
                                        openEditArtworkDialog(artwork)
                                      }
                                      startIcon={<BrushSharpIcon />}
                                    ></Button>
                                  </>
                                ) : undefined
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
                  ))}
                <PurchaseRequestDialog
                  open={purchaseRequestDialogOpen}
                  onClose={togglePurchaseRequestDialog}
                  props={{
                    pathname: "/messages",
                    title: purchaseRequestDialogData.title,
                    creator: purchaseRequestDialogData.creator,
                    url: purchaseRequestDialogData.url,
                    referTo: purchaseRequestDialogData.referTo,
                    imageUrl: purchaseRequestDialogData.imageurl,
                  }}
                />
                <EditArtworkDialog
                  artwork={artworkToEdit}
                  open={editArtworkOpen}
                  onClose={onEditArtworkClose}
                />
                {artworks.isLoading && (
                  <>
                    <div className={s.portfolioRow}>
                      <ArtworkListItemDefinedSkeleton grow={1} />
                      <ArtworkListItemDefinedSkeleton grow={3} />
                      <ArtworkListItemDefinedSkeleton grow={2} />
                      <ArtworkListItemDefinedSkeleton grow={1} />
                    </div>
                    <div className={s.portfolioRow}>
                      <ArtworkListItemDefinedSkeleton grow={2} />
                      <ArtworkListItemDefinedSkeleton grow={4} />
                      <ArtworkListItemDefinedSkeleton grow={3} />
                    </div>
                  </>
                )}
              </div>
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
            <TabPanel value={activeTab} index={2}>
              {
                articles && (
                  <div className={s.flex}>
                    {articles.map((article, key) => {
                      return (
                        <Link
                          href={`/${article.publishCategory.slug.replace(
                            "konstnärsporträtt",
                            "konstnaersportraett"
                          )}/${article.slug}`}
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
                      );
                    })}
                  </div>
                )
                // Grid i första div sen flexbox i nästa
              }
            </TabPanel>
          </Box>
        </div>
      ) : (
        <div className={s.tabsContainer}>
          <Tabs
            value={activeTab}
            centered
            className={s.tabs}
            onChange={handleTabChange}
          >
            <Tab
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
              ></AboutMe>
            </TabPanel>
            {isMyProfile && (
              <TabPanel value={activeTab} index={1}>
                <Offers />
              </TabPanel>
            )}
          </Box>
        </div>
      )}
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
  );
}

